import { Injectable } from '@nestjs/common';
import { CreateFunctionalityDto } from './dto/create-functionality.dto';
import { UpdateFunctionalityDto } from './dto/update-functionality.dto';
import { FunctionalitiesRepository } from 'src/repositories';

@Injectable()
export class FunctionalitiesService {
  constructor(
    private readonly functionalitiesRepository: FunctionalitiesRepository,
  ) { }

  async create(data: CreateFunctionalityDto) {
    return await this.functionalitiesRepository.create(data);
  }

  async createMany(data: CreateFunctionalityDto[]) {
    return await this.functionalitiesRepository.createMany(data);
  }

  async update(id: number, data: UpdateFunctionalityDto) {
    return await this.functionalitiesRepository.update({ where: { id }, data });
  }

  async remove(id: number) {
    return await this.functionalitiesRepository.delete({ where: { id } });
  }
}
