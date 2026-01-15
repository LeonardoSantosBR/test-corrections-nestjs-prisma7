import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateFunctionalityDto } from './dto/create-functionality.dto';
import { FunctionalitiesController } from './functionalities.controller';

@Controller('functionalities')
export class FunctionalitiesRouter {
  constructor(
    private readonly functionalitiesController: FunctionalitiesController,
  ) {}

  @Post()
  async createOrUpdate(@Body() body: CreateFunctionalityDto[]) {
    return await this.functionalitiesController.createOrUpdate(body);
  }

  @Post('/in-batch')
  createMany(@Body() body: CreateFunctionalityDto[]) {
    return this.functionalitiesController.createMany(body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.functionalitiesController.remove(+id);
  }
}
