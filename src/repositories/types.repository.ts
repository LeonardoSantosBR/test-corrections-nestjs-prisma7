import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/database/prisma/prisma-service';

@Injectable()
export class TypesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.typesCreateInput) {
    const new_type = await this.prisma.types.create({ data });
    return new_type;
  }

  async findAll(params: Prisma.typesFindManyArgs) {
    const query = await this.prisma.types.findMany(params);
    return query;
  }

  async findManyTypesFunctionalities(
    params: Prisma.typesFunctionalitiesFindManyArgs,
  ) {
    const new_type = await this.prisma.typesFunctionalities.findMany(params);
    return new_type;
  }

  async count(params: Prisma.typesCountArgs): Promise<number> {
    const query = await this.prisma.types.count(params);
    return query;
  }

  async createMany(data: Prisma.typesCreateInput[]) {
    const new_types = await this.prisma.types.createMany({ data });
    return new_types;
  }

  async createManyTypesFunctionalities(
    params: Prisma.typesFunctionalitiesCreateManyArgs,
  ) {
    const new_types_func =
      await this.prisma.typesFunctionalities.createMany(params);
    return new_types_func;
  }

  async findOne(params: Prisma.typesFindFirstArgs) {
    const query = await this.prisma.types.findFirst(params);
    return query;
  }

  async update(params: Prisma.typesUpdateArgs) {
    await this.prisma.types.update(params);
    return true;
  }

  async findOneFuncUsing(params: Prisma.typesFunctionalitiesFindFirstArgs) {
    const query = await this.prisma.typesFunctionalities.findFirst(params);
    return query;
  }

  async delete(params: Prisma.typesDeleteArgs) {
    await this.prisma.types.delete(params);
    return true;
  }

  async deleteManyTypesFunctionalities(
    params: Prisma.typesFunctionalitiesDeleteManyArgs,
  ) {
    const del_types = await this.prisma.typesFunctionalities.deleteMany(params);
    return del_types;
  }
}
