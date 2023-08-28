import { faker } from '@faker-js/faker';
import { PrismaService } from '../../src/prisma/prisma.service';

export async function createNewMedia(prisma: PrismaService, title: string) {
  const newMedia = {
    title: title,
    username: faker.internet.userName(),
  };

  return await prisma.media.create({
    data: newMedia,
  });
}
