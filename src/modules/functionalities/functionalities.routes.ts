import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateFunctionalityDto } from './dto/create-functionality.dto';
import { UpdateFunctionalityDto } from './dto/update-functionality.dto';
import { FunctionalitiesController } from './functionalities.controller';

@Controller('functionalities')
export class FunctionalitiesRouter {
  constructor(
    private readonly functionalitiesController: FunctionalitiesController,
  ) {}

  @Post()
  create(@Body() body: CreateFunctionalityDto) {
    return this.functionalitiesController.create(body);
  }

  @Post('/many')
  createMany(@Body() body: CreateFunctionalityDto[]) {
    return this.functionalitiesController.createMany(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.functionalitiesController.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateFunctionalityDto) {
    return this.functionalitiesController.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.functionalitiesController.remove(+id);
  }
}
