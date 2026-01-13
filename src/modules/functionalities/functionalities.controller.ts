import { Get, Post, Body, Patch, Param, Delete, Injectable } from '@nestjs/common';
import { FunctionalitiesService } from './functionalities.service';
import { CreateFunctionalityDto } from './dto/create-functionality.dto';
import { UpdateFunctionalityDto } from './dto/update-functionality.dto';

@Injectable()
export class FunctionalitiesController {
  constructor(private readonly functionalitiesService: FunctionalitiesService) { }

  async create(body: CreateFunctionalityDto) {
    return this.functionalitiesService.create(body);
  }

  async findOne(id: string) {
    return this.functionalitiesService.findOne(+id);
  }

  async update(id: string, body: UpdateFunctionalityDto) {
    return this.functionalitiesService.update(+id, body);
  }

  async remove(id: string) {
    return this.functionalitiesService.remove(+id);
  }
}
