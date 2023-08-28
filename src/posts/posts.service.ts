import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async getAll() {
    return await this.postsRepository.findAll();
  }

  async getOneById(id: number) {
    const post = await this.postsRepository.findOneById(id);

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async updatePost(id: number, body: CreatePostDto) {
    const post = await this.postsRepository.findOneById(id);

    if (!post) {
      throw new NotFoundException();
    }

    return await this.postsRepository.update(id, body);
  }
}
