import { Module } from '@nestjs/common';
import { MediasService } from './medias.service';
import { MediasController } from './medias.controller';
import { MediasRepository } from './medias.respository';
import { PrismaModule } from '../prisma/prisma.module';
import { PublicationsRepository } from '../publications/publications.repository';

@Module({
  imports: [PrismaModule],
  controllers: [MediasController],
  providers: [MediasService, MediasRepository, PublicationsRepository],
})
export class MediasModule {}
