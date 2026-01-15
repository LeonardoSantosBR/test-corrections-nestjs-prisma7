import { Injectable } from '@nestjs/common';
import { CreateFunctionalityDto } from './dto/create-functionality.dto';
import { FunctionalitiesRepository } from 'src/repositories';

@Injectable()
export class FunctionalitiesService {
  constructor(
    private readonly functionalitiesRepository: FunctionalitiesRepository,
  ) {}

  async createOrUpdate(data: CreateFunctionalityDto[]) {
    for (const func of data) {
      await this.functionalitiesRepository.createOrUpdate({
        where: {
          id: func.id,
        },
        create: func,
        update: func,
      });
    }
    return true;
  }

  async findOneTypesUsing(id: number) {
    return await this.functionalitiesRepository.findOneTypesUsing({
      where: { functionalityId: id },
    });
  }

  async createMany(data: CreateFunctionalityDto[]) {
    return await this.functionalitiesRepository.createMany(data);
  }

  async remove(id: number) {
    return await this.functionalitiesRepository.delete({ where: { id } });
  }
}
