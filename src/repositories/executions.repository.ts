import { Injectable } from "@nestjs/common";
import { Prisma } from "generated/prisma/client";
import { PrismaService } from "src/database/prisma/prisma-service";

@Injectable()
export class ExecutionsRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: Prisma.executionsCreateInput) {
        const new_test = await this.prisma.executions.create({ data });
        return new_test;
    }

    async findAll(params: Prisma.executionsFindManyArgs) {
        const query = await this.prisma.executions.findMany(params);
        return query;
    }

    async count(params: Prisma.executionsCountArgs): Promise<number> {
        const query = await this.prisma.executions.count(params);
        return query;
    }

    async findOne(params: Prisma.executionsFindFirstArgs) {
        const query = await this.prisma.executions.findFirst(params)
        return query;
    }

    async update(params: Prisma.executionsUpdateArgs) {
        await this.prisma.executions.update(params);
        return true;
    }

    async delete(params: Prisma.executionsDeleteArgs) {
        await this.prisma.executions.delete(params);
        return true;
    }
}