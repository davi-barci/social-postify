import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsRepository } from './posts.repository';
import { PublicationsRepository } from '../publications/publications.repository';

@Injectable()
export class PostsService {
  constructor(
    @Inject(forwardRef(() => PublicationsRepository))
    private readonly publicationsRepository: PublicationsRepository,
    private readonly postsRepository: PostsRepository,
  ) {}

  async create(body: CreatePostDto) {
    if (!body.title || !body.text) {
      throw new BadRequestException();
    }

    return await this.postsRepository.create(body);
  }

  async getAll() {
    return await this.postsRepository.findAll();
  }

  async getOneById(id: number) {
    const post = await this.postsRepository.findOneById(id);

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async updatePost(id: number, body: CreatePostDto) {
    const post = await this.postsRepository.findOneById(id);

    if (!post) {
      throw new NotFoundException();
    }

    return await this.postsRepository.update(id, body);
  }

  async deletePost(id: number) {
    const media = await this.postsRepository.findOneById(id);

    if (!media) {
      throw new NotFoundException();
    }

    const publicationPost =
      await this.publicationsRepository.findOneByPostId(id);

    if (publicationPost) {
      throw new ForbiddenException();
    }

    return this.postsRepository.delete(id);
  }
}
