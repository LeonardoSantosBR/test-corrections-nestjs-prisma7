import { Injectable } from '@nestjs/common';
import { FunctionalitiesService } from './functionalities.service';
import { CreateFunctionalityDto } from './dto/create-functionality.dto';
import { UpdateFunctionalityDto } from './dto/update-functionality.dto';

@Injectable()
export class FunctionalitiesController {
  constructor(
    private readonly functionalitiesService: FunctionalitiesService,
  ) {}

  async create(body: CreateFunctionalityDto) {
    return this.functionalitiesService.create(body);
  }

  async createMany(body: CreateFunctionalityDto[]) {
    return this.functionalitiesService.createMany(body);
  }

  async update(id: number, body: UpdateFunctionalityDto) {
    return this.functionalitiesService.update(+id, body);
  }

  async remove(id: number) {
    return this.functionalitiesService.remove(+id);
  }
}
