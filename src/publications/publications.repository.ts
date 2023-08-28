import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
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
}
