import { Module } from '@nestjs/common';
import { MediasService } from './medias.service';
import { MediasController } from './medias.controller';
import { MediasRepository } from './medias.respository';
import { PrismaModule } from '../../src/prisma/prisma.module';
import { PublicationsRepository } from '../../src/publications/publications.repository';

@Module({
  imports: [PrismaModule],
  controllers: [MediasController],
  providers: [MediasService, MediasRepository, PublicationsRepository],
})
export class MediasModule {}
