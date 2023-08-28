import { Module } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { PublicationsRepository } from './publications.repository';
import { MediasRepository } from 'src/medias/medias.respository';
import { PostsRepository } from 'src/posts/posts.repository';

@Module({
  controllers: [PublicationsController],
  providers: [
    PublicationsService,
    PublicationsRepository,
    MediasRepository,
    PostsRepository,
  ],
})
export class PublicationsModule {}
