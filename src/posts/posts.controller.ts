import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() body: CreatePostDto) {
    return this.postsService.create(body);
  }

  @Get()
  getAll() {
    return this.postsService.getAll();
  }

  @Get(':id')
  getOneById(@Param('id', new ParseIntPipe()) id: number) {
    return this.postsService.getOneById(id);
  }

  @Put(':id')
  updatePost(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: CreatePostDto,
  ) {
    return this.postsService.updatePost(id, body);
  }

  @Delete(':id')
  deletePost(@Param('id', new ParseIntPipe()) id: number) {
    return this.postsService.deletePost(id);
  }
}
