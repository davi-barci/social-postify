import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post()
  create(@Body() body: CreatePublicationDto) {
    return this.publicationsService.create(body);
  }

  @Get()
  getAll() {
    return this.publicationsService.getAll();
  }

  @Get(':id')
  getOneById(@Param('id', new ParseIntPipe()) id: number) {
    return this.publicationsService.getOneById(id);
  }
}
