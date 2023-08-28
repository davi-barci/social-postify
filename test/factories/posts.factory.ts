import { faker } from '@faker-js/faker';
import { PrismaService } from '../../src/prisma/prisma.service';

export async function createNewPost(prisma: PrismaService) {
  const newPost = {
    title: faker.lorem.sentence(),
    text: faker.internet.url(),
  };

  return await prisma.post.create({
    data: newPost,
  });
}
