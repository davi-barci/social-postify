import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from '@prisma/client';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreatePostDto): Promise<Post> {
    return await this.prisma.post.create({
      data: body,
    });
  }

  async findAll(): Promise<Post[]> {
    return await this.prisma.post.findMany();
  }

  async findOneById(id: number): Promise<Post | null> {
    return await this.prisma.post.findFirst({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, body: CreatePostDto): Promise<Post> {
    return await this.prisma.post.update({
      where: {
        id,
      },
      data: body,
    });
  }
}
