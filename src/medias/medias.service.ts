import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { MediasRepository } from './medias.respository';
import { PublicationsRepository } from 'src/publications/publications.repository';

@Injectable()
export class MediasService {
  constructor(
    @Inject(forwardRef(() => PublicationsRepository))
    private readonly publicationsRepository: PublicationsRepository,
    private readonly mediasRepository: MediasRepository,
  ) {}

  async create(body: CreateMediaDto) {
    if (!body.title || !body.username) {
      throw new BadRequestException();
    }
    const media = await this.mediasRepository.findOne(
      body.title,
      body.username,
    );

    if (media) {
      throw new ConflictException();
    }

    return await this.mediasRepository.create(body);
  }

  async getAll() {
    return await this.mediasRepository.findAll();
  }

  async getOneById(id: number) {
    const media = await this.mediasRepository.findOneById(id);

    if (!media) {
      throw new NotFoundException();
    }

    return media;
  }

  async updateMedia(id: number, body: CreateMediaDto) {
    const media = await this.mediasRepository.findOneById(id);

    if (!media) {
      throw new NotFoundException();
    }

    const mediaAlreadyExists = await this.mediasRepository.findOne(
      body.title,
      body.username,
    );

    if (mediaAlreadyExists) {
      throw new ConflictException();
    }

    return await this.mediasRepository.update(id, body);
  }

  async deleteMedia(id: number) {
    const media = await this.mediasRepository.findOneById(id);

    if (!media) {
      throw new NotFoundException();
    }

    const publicationMedia =
      await this.publicationsRepository.findOneByMediaId(id);

    if (publicationMedia) {
      throw new ForbiddenException();
    }

    return this.mediasRepository.delete(id);
  }
}
