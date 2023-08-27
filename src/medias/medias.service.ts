import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
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
}
