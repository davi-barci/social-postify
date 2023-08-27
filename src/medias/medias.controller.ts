import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Delete,
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

  @Put(':id')
  updateMedia(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: CreateMediaDto,
  ) {
    return this.mediasService.updateMedia(id, body);
  }

  @Delete(':id')
  deleteMedia(@Param('id', new ParseIntPipe()) id: number) {
    return this.mediasService.deleteMedia(id);
  }
}
