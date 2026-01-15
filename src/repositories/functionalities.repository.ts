import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/database/prisma/prisma-service';

@Injectable()
export class FunctionalitiesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdate(data: Prisma.functionalitiesUpsertArgs) {
    await this.prisma.functionalities.upsert({
      where: data.where,
      create: data.create,
      update: data.update,
    });
    return true;
  }

  async findOneTypesUsing(params: Prisma.typesFunctionalitiesFindFirstArgs) {
    const query = await this.prisma.typesFunctionalities.findFirst(params);
    return query;
  }

  async createMany(data: Prisma.functionalitiesCreateInput[]) {
    const new_func = await this.prisma.functionalities.createMany({ data });
    return new_func;
  }

  async delete(params: Prisma.functionalitiesDeleteArgs) {
    await this.prisma.functionalities.delete(params);
    return true;
  }
}
