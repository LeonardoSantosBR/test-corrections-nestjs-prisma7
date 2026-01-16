import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/database/prisma/prisma-service';

@Injectable()
export class TestsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.testsCreateInput) {
    const new_test = await this.prisma.tests.create({ data });
    return new_test;
  }

  async findAll(params: Prisma.testsFindManyArgs) {
    const query = await this.prisma.tests.findMany(params);
    return query;
  }

  async count(params: Prisma.testsCountArgs): Promise<number> {
    const query = await this.prisma.tests.count(params);
    return query;
  }

  async findOne(params: Prisma.testsFindFirstArgs) {
    const query = await this.prisma.tests.findFirst(params);
    return query;
  }

  async update(params: Prisma.testsUpdateArgs) {
    await this.prisma.tests.update(params);
    return true;
  }

  async createQuestion(params: Prisma.questionsCreateArgs) {
    await this.prisma.questions.create(params);
    return true;
  }

  async updateQuestion(params: Prisma.questionsUpdateArgs) {
    await this.prisma.questions.update(params);
    return true;
  }

  async questionsDeleteMany(params: Prisma.questionsDeleteManyArgs) {
    await this.prisma.questions.deleteMany(params);
    return true;
  }

  async delete(params: Prisma.testsDeleteArgs) {
    await this.prisma.tests.delete(params);
    return true;
  }
}
