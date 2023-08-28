import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationsRepository } from './publications.repository';
import { MediasRepository } from 'src/medias/medias.respository';
import { PostsRepository } from 'src/posts/posts.repository';

@Injectable()
export class PublicationsService {
  constructor(
    private readonly publicationsRepository: PublicationsRepository,
    private readonly mediasRepository: MediasRepository,
    private readonly postsRepository: PostsRepository,
  ) {}

  async create(body: CreatePublicationDto) {
    if (!body.mediaId || !body.postId || !body.date) {
      throw new BadRequestException();
    }

    const media = await this.mediasRepository.findOneById(body.mediaId);
    const post = await this.postsRepository.findOneById(body.postId);

    if (!media || !post) {
      throw new NotFoundException();
    }

    return this.publicationsRepository.create(body);
  }

  async getAll() {
    return await this.publicationsRepository.findAll();
  }

  async getOneById(id: number) {
    const publication = await this.publicationsRepository.findOneById(id);

    if (!publication) {
      throw new NotFoundException();
    }

    return publication;
  }

  async updatePublication(id: number, body: CreatePublicationDto) {
    const publication = await this.publicationsRepository.findOneById(id);

    if (!publication) {
      throw new NotFoundException();
    }

    const publicationDate = new Date(publication.date);
    const currentDate = new Date();

    if (publicationDate < currentDate) {
      throw new ForbiddenException();
    }

    const media = await this.mediasRepository.findOneById(body.mediaId);
    const post = await this.postsRepository.findOneById(body.postId);

    if (!media || !post) {
      throw new NotFoundException();
    }

    return this.publicationsRepository.update(id, body);
  }
}
