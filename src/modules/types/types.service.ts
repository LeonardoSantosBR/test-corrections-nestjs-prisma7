import { Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { TypesRepository } from 'src/repositories';
import { Prisma, types } from 'generated/prisma/client';

@Injectable()
export class TypesService {
  constructor(private readonly typesRepository: TypesRepository) {}

  async create(data: CreateTypeDto) {
    const { functionalitiesIds, ...rest } = data;
    return await this.typesRepository.create({
      ...rest,
      typesFunctionalities: functionalitiesIds
        ? {
            create: functionalitiesIds.map((functionalityId) => ({
              functionalityId,
            })),
          }
        : undefined,
    });
  }

  async findAll(params: Prisma.typesFindManyArgs) {
    const [rows, count]: [types[], number] = await Promise.all([
      this.typesRepository.findAll(params),
      this.typesRepository.count({
        where: params.where || {},
      }),
    ]);
    return { rows, count };
  }

  async update(id: number, data: UpdateTypeDto) {
    const { functionalitiesIds, ...rest } = data;

    await this.typesRepository.update({
      where: { id },
      data: {
        ...rest,
        updatedAt: new Date(),
      },
    });

    if (functionalitiesIds.length > 0) {
      const currentRelations =
        await this.typesRepository.findManyTypesFunctionalities({
          where: { typeId: id },
        });

      const currentIds = currentRelations.map((rel) => rel.functionalityId);
      const idsToRemove = currentIds.filter(
        (fid) => !functionalitiesIds.includes(fid),
      );

      const idsToAdd = functionalitiesIds.filter(
        (fid) => !currentIds.includes(fid),
      );
      if (idsToRemove.length > 0) {
        await this.typesRepository.deleteManyTypesFunctionalities({
          where: {
            typeId: id,
            functionalityId: { in: idsToRemove },
          },
        });
      }

      if (idsToAdd.length > 0) {
        await this.typesRepository.createManyTypesFunctionalities({
          data: idsToAdd.map((functionalityId) => ({
            typeId: id,
            functionalityId,
          })),
          skipDuplicates: true,
        });
      }
    }
    return true;
  }

  async remove(id: number) {
    return await this.remove(id);
  }
}
