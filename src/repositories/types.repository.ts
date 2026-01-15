import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/database/prisma/prisma-service';

@Injectable()
export class TypesRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: Prisma.typesCreateInput) {
        const new_type = await this.prisma.types.create({ data });
        return new_type;
    }

    async createMany(data: Prisma.typesCreateInput[]) {
        const new_type = await this.prisma.types.createMany({ data });
        return new_type;
    }

    async findOne(params: Prisma.typesFindFirstArgs) {
        const query = await this.prisma.types.findFirst(params);
        return query;
    }

    async update(params: Prisma.typesUpdateArgs) {
        await this.prisma.types.update(params);
        return true;
    }

    async delete(params: Prisma.typesDeleteArgs) {
        await this.prisma.types.delete(params);
        return true;
    }
}
