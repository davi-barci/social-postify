import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMediaDto } from './dto/create-media.dto';

@Injectable()
export class MediasRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateMediaDto): Promise<CreateMediaDto> {
    return await this.prisma.media.create({
      data: body,
    });
  }

  async findOne(
    title: string,
    username: string,
  ): Promise<CreateMediaDto | null> {
    return await this.prisma.media.findFirst({
      where: {
        title: title,
        username: username,
      },
    });
  }
}
