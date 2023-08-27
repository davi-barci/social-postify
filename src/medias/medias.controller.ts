import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { MediasService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';

@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  @Post()
  create(@Body() body: CreateMediaDto) {
    return this.mediasService.create(body);
  }

  @Get()
  getAll() {
    return this.mediasService.getAll();
  }

  @Get(':id')
  getOneById(@Param('id', new ParseIntPipe()) id: number) {
    return this.mediasService.getOneById(id);
  }
}
