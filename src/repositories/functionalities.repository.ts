import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/database/prisma/prisma-service';

@Injectable()
export class FunctionalitiesRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: Prisma.functionalitiesCreateInput) {
        const new_test = await this.prisma.functionalities.create({ data });
        return new_test;
    }

    async findOne(params: Prisma.functionalitiesFindFirstArgs) {
        const query = await this.prisma.functionalities.findFirst(params);
        return query;
    }

    async update(params: Prisma.functionalitiesUpdateArgs) {
        await this.prisma.functionalities.update(params);
        return true;
    }

    async delete(params: Prisma.functionalitiesDeleteArgs) {
        await this.prisma.functionalities.delete(params);
        return true;
    }
}
