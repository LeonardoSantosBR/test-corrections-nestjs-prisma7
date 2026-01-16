import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { querySearchTypes } from './dto/query-search-types';
import { TypesController } from './types.controller';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('types')
@Controller('types')
export class TypesRouter {
  constructor(private readonly typesController: TypesController) {}

  @Post('')
  async create(@Body() body: CreateTypeDto) {
    return await this.typesController.create(body);
  }

  @Get('')
  async findAll(@Query() querys: querySearchTypes) {
    return await this.typesController.findAll(querys);
  }

  @Patch('/:id')
  async update(@Body() body: UpdateTypeDto, @Param('id') id: string) {
    return await this.typesController.update(+id, body);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.typesController.remove(+id);
  }
}
