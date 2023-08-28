import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { createNewMedia } from './factories/medias.factory';
import { createNewPost } from './factories/posts.factory';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prisma = app.get(PrismaService);

    await prisma.publication.deleteMany();
    await prisma.media.deleteMany();
    await prisma.post.deleteMany();

    await app.init();
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect("I'm OK!");
  });

  describe('/medias', () => {
    it('/medias (POST) => should create a new media', async () => {
      const media = {
        title: 'Instagram',
        username: 'myusername',
      };

      const { statusCode, body } = await request(app.getHttpServer())
        .post('/medias')
        .send(media);

      expect(statusCode).toBe(HttpStatus.CREATED);
      expect(body).toMatchObject({
        id: expect.any(Number),
        title: media.title,
        username: media.username,
      });
    });

    it('/medias (POST) => should return Bad Request Exception', async () => {
      const media = {
        title: 'Instagram',
      };

      const { statusCode } = await request(app.getHttpServer())
        .post('/medias')
        .send(media);

      expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('/medias (POST) => should return Conflict Exception', async () => {
      const media = await createNewMedia(prisma, 'Instagram');

      const { statusCode } = await request(app.getHttpServer())
        .post('/medias')
        .send(media);

      expect(statusCode).toBe(HttpStatus.CONFLICT);
    });

    it('/medias (GET) => should get all medias', async () => {
      const mediaFace = await createNewMedia(prisma, 'Facebook');
      const mediaInsta = await createNewMedia(prisma, 'Instagram');

      const { statusCode, body } = await request(app.getHttpServer()).get(
        '/medias',
      );

      expect(statusCode).toBe(HttpStatus.OK);

      expect(body).toEqual(
        expect.arrayContaining([
          {
            id: mediaFace.id,
            title: mediaFace.title,
            username: mediaFace.username,
          },
          {
            id: mediaInsta.id,
            title: mediaInsta.title,
            username: mediaInsta.username,
          },
        ]),
      );
    });

    it('/medias/:id (GET) => should get media by id', async () => {
      const mediaFace = await createNewMedia(prisma, 'Facebook');

      const { statusCode, body } = await request(app.getHttpServer()).get(
        `/medias/${mediaFace.id}`,
      );

      expect(statusCode).toBe(HttpStatus.OK);

      expect(body).toMatchObject({
        id: mediaFace.id,
        title: mediaFace.title,
        username: mediaFace.username,
      });
    });

    it('/medias/:id (GET) => should return Not Found Exception', async () => {
      const { statusCode } = await request(app.getHttpServer()).get(
        `/medias/0`,
      );

      expect(statusCode).toBe(HttpStatus.NOT_FOUND);
    });

    it('/medias/:id (PUT) => should update media', async () => {
      const mediaFace = await createNewMedia(prisma, 'Facebook');
      const mediaInsta = {
        title: 'Instagram',
        username: 'teste',
      };

      const { statusCode, body } = await request(app.getHttpServer())
        .put(`/medias/${mediaFace.id}`)
        .send(mediaInsta);

      expect(statusCode).toBe(HttpStatus.OK);

      expect(body).toMatchObject({
        id: mediaFace.id,
        title: mediaInsta.title,
        username: mediaInsta.username,
      });
    });

    it('/medias/:id (PUT) => should return Not Found Exception', async () => {
      const mediaFace = await createNewMedia(prisma, 'Facebook');
      const mediaInsta = {
        title: 'Instagram',
        username: 'teste',
      };

      const { statusCode } = await request(app.getHttpServer())
        .put(`/medias/0`)
        .send(mediaInsta);

      expect(statusCode).toBe(HttpStatus.NOT_FOUND);
    });

    it('/medias/:id (PUT) => should return Conflict Exception', async () => {
      const mediaFace = await createNewMedia(prisma, 'Facebook');
      const mediaTwitter = await createNewMedia(prisma, 'Twitter');

      const { statusCode } = await request(app.getHttpServer())
        .put(`/medias/${mediaFace.id}`)
        .send(mediaTwitter);

      expect(statusCode).toBe(HttpStatus.CONFLICT);
    });

    it('/medias/:id (DELETE) => should delete media', async () => {
      const mediaFace = await createNewMedia(prisma, 'Facebook');

      const getResponseBeforeDelete = await request(app.getHttpServer()).get(
        `/medias/${mediaFace.id}`,
      );

      expect(getResponseBeforeDelete.statusCode).toBe(HttpStatus.OK);

      await request(app.getHttpServer()).delete(`/medias/${mediaFace.id}`);

      const getResponseAfterDelete = await request(app.getHttpServer()).get(
        `/medias/${mediaFace.id}`,
      );

      expect(getResponseAfterDelete.statusCode).toBe(HttpStatus.NOT_FOUND);
    });
  });

  describe('/posts', () => {
    it('/posts (POST) => should create a new post', async () => {
      const post = {
        title: 'Why you should have a guinea pig?',
        text: 'https://www.guineapigs.com/why-you-should-guinea',
      };

      const { statusCode, body } = await request(app.getHttpServer())
        .post('/posts')
        .send(post);

      expect(statusCode).toBe(HttpStatus.CREATED);
      expect(body).toMatchObject({
        id: expect.any(Number),
        title: post.title,
        text: post.text,
        image: null,
      });
    });

    it('/posts (GET) => should get all posts', async () => {
      const firstPost = await createNewPost(prisma);
      const secondPost = await createNewPost(prisma);

      const { statusCode, body } = await request(app.getHttpServer()).get(
        '/posts',
      );

      expect(statusCode).toBe(HttpStatus.OK);

      expect(body).toEqual(
        expect.arrayContaining([
          {
            id: firstPost.id,
            title: firstPost.title,
            text: firstPost.text,
            image: null,
          },
          {
            id: secondPost.id,
            title: secondPost.title,
            text: secondPost.text,
            image: null,
          },
        ]),
      );
    });

    it('/posts/:id (GET) => should get post by id', async () => {
      const post = await createNewPost(prisma);

      const { statusCode, body } = await request(app.getHttpServer()).get(
        `/posts/${post.id}`,
      );

      expect(statusCode).toBe(HttpStatus.OK);

      expect(body).toMatchObject({
        id: post.id,
        title: post.title,
        text: post.text,
        image: null,
      });
    });

    it('/posts/:id (GET) => should return Not Found Exception', async () => {
      const post = await createNewPost(prisma);

      const { statusCode } = await request(app.getHttpServer()).get(`/posts/0`);

      expect(statusCode).toBe(HttpStatus.NOT_FOUND);
    });

    it('/posts/:id (PUT) => should update post', async () => {
      const post = await createNewPost(prisma);
      const updatePost = {
        title: 'Title Test',
        text: 'https://www.guineapigs.com/why-you-should-guinea',
      };

      const { statusCode, body } = await request(app.getHttpServer())
        .put(`/posts/${post.id}`)
        .send(updatePost);

      expect(statusCode).toBe(HttpStatus.OK);

      expect(body).toMatchObject({
        id: post.id,
        title: updatePost.title,
        text: updatePost.text,
        image: null,
      });
    });

    it('/posts/:id (PUT) => should return Not Found Exception', async () => {
      const post = await createNewPost(prisma);
      const updatePost = {
        title: 'Title Test',
        text: 'https://www.guineapigs.com/why-you-should-guinea',
      };

      const { statusCode, body } = await request(app.getHttpServer())
        .put(`/posts/0`)
        .send(updatePost);

      expect(statusCode).toBe(HttpStatus.NOT_FOUND);
    });

    it('/posts/:id (DELETE) => should delete post', async () => {
      const post = await createNewPost(prisma);

      const getResponseBeforeDelete = await request(app.getHttpServer()).get(
        `/posts/${post.id}`,
      );

      expect(getResponseBeforeDelete.statusCode).toBe(HttpStatus.OK);

      await request(app.getHttpServer()).delete(`/posts/${post.id}`);

      const getResponseAfterDelete = await request(app.getHttpServer()).get(
        `/posts/${post.id}`,
      );

      expect(getResponseAfterDelete.statusCode).toBe(HttpStatus.NOT_FOUND);
    });
  });
});
