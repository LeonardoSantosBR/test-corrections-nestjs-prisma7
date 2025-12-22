import { Prisma, PrismaClient } from "generated/prisma/client";

export class TestsRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async create(data: Prisma.testsCreateInput) {
        const new_test = await this.prisma.tests.create({ data });
        return new_test;
    }

    async findAll(params: Prisma.testsFindManyArgs) {
        const [rows, count] = await Promise.all([
            this.prisma.tests.findMany(params),
            this.prisma.tests.count({
                where: params.where || {},
            }),
        ]);
        return { rows, count };
    }

    async findOne(params: Prisma.testsFindFirstArgs) {
        const findedUser = await this.prisma.tests.findFirst(params);
        return findedUser;
    }

    async update(params: Prisma.testsUpdateArgs) {
        await this.prisma.tests.update(params);
        return true;
    }

    async delete(params: Prisma.testsDeleteArgs) {
        await this.prisma.tests.delete(params);
        return true;
    }
}