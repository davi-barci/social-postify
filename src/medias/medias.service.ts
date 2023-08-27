import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { MediasRepository } from './medias.respository';

@Injectable()
export class MediasService {
  constructor(private readonly mediasRepository: MediasRepository) {}

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

    const mediaExists = await this.mediasRepository.findOne(
      body.title,
      body.username,
    );

    if (mediaExists) {
      throw new ConflictException();
    }

    return await this.mediasRepository.update(id, body);
  }
}
