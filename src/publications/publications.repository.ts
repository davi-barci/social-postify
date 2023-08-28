import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { Publication } from '@prisma/client';

@Injectable()
export class PublicationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreatePublicationDto): Promise<Publication> {
    return await this.prisma.publication.create({
      data: body,
    });
  }

  async findAll(): Promise<Publication[]> {
    return await this.prisma.publication.findMany();
  }

  async findOneById(id: number): Promise<Publication | null> {
    return await this.prisma.publication.findFirst({
      where: {
        id: id,
      },
    });
  }

  async findOneByMediaId(id: number): Promise<Publication | null> {
    return await this.prisma.publication.findFirst({
      where: {
        mediaId: id,
      },
    });
  }

  async findOneByPostId(id: number): Promise<Publication | null> {
    return await this.prisma.publication.findFirst({
      where: {
        postId: id,
      },
    });
  }

  async update(id: number, body: CreatePublicationDto): Promise<Publication> {
    return await this.prisma.publication.update({
      where: {
        id,
      },
      data: body,
    });
  }

  async delete(id: number): Promise<Publication> {
    return await this.prisma.publication.delete({
      where: {
        id,
      },
    });
  }
}
