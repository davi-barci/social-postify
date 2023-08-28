import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async create(body: CreatePostDto) {
    if (!body.title || !body.text) {
      throw new BadRequestException();
    }

    return await this.postsRepository.create(body);
  }
}
