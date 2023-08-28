import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { Media } from '@prisma/client';

@Injectable()
export class MediasRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateMediaDto): Promise<Media> {
    return await this.prisma.media.create({
      data: body,
    });
  }

  async findOne(title: string, username: string): Promise<Media | null> {
    return await this.prisma.media.findFirst({
      where: {
        title: title,
        username: username,
      },
    });
  }

  async findAll(): Promise<Media[]> {
    return await this.prisma.media.findMany();
  }

  async findOneById(id: number): Promise<Media | null> {
    return await this.prisma.media.findFirst({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, body: CreateMediaDto): Promise<Media> {
    return await this.prisma.media.update({
      where: {
        id,
      },
      data: body,
    });
  }

  async delete(id: number): Promise<Media> {
    return await this.prisma.media.delete({
      where: {
        id,
      },
    });
  }
}
