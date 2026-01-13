import { Injectable } from '@nestjs/common';
import { CreateFunctionalityDto } from './dto/create-functionality.dto';
import { UpdateFunctionalityDto } from './dto/update-functionality.dto';
import { FunctionalitiesRepository } from 'src/repositories';

@Injectable()
export class FunctionalitiesService {
  constructor(private readonly functionalitiesRepository: FunctionalitiesRepository) { }

  async create(data: CreateFunctionalityDto) {
    const { typeId, ...rest } = data;
    return await this.functionalitiesRepository.create({ ...rest, type: { connect: { id: typeId } } })
  }

  async findOne(id: number) {
    return await this.functionalitiesRepository.findOne({ where: { id } });
  }

  async update(id: number, data: UpdateFunctionalityDto) {
    const { typeId, ...rest } = data;
    return await this.functionalitiesRepository.update({ where: { id }, data: { ...rest, type: { connect: { id: typeId } } } })
  }

  async remove(id: number) {
    return await this.functionalitiesRepository.delete({ where: { id } })
  }
}
