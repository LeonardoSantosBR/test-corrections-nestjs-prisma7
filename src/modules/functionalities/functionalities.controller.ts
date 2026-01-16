import { BadRequestException, Injectable } from '@nestjs/common';
import { FunctionalitiesService } from './functionalities.service';
import { CreateFunctionalityDto } from './dto/create-functionality.dto';

@Injectable()
export class FunctionalitiesController {
  constructor(
    private readonly functionalitiesService: FunctionalitiesService,
  ) {}

  async createOrUpdate(body: CreateFunctionalityDto[]) {
    return this.functionalitiesService.createOrUpdate(body);
  }

  async createMany(body: CreateFunctionalityDto[]) {
    return this.functionalitiesService.createMany(body);
  }

  async remove(id: number) {
    if (!id) throw new BadRequestException('Id não enviado.');
    const isSomeTypeUsing =
      await this.functionalitiesService.findOneTypesUsing(id);

    if (isSomeTypeUsing)
      throw new BadRequestException(
        'Já existe um Tipo de usuário usando essa funcionalidade.',
      );
    return this.functionalitiesService.remove(+id);
  }
}
