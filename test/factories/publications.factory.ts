import { faker } from '@faker-js/faker';
import { PrismaService } from '../../src/prisma/prisma.service';
import { createNewMedia } from './medias.factory';
import { createNewPost } from './posts.factory';

export async function createNewPublication(prisma: PrismaService) {
  const newMedia = await createNewMedia(prisma, 'Instagram');
  const newPost = await createNewPost(prisma);

  const date = new Date();
  date.setDate(date.getDate() + 1);

  const newPublication = {
    mediaId: newMedia.id,
    postId: newPost.id,
    date: date,
  };

  return await prisma.publication.create({
    data: newPublication,
  });
}
