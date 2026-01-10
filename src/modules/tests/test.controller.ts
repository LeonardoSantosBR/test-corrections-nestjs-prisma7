import { Injectable, BadRequestException } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Prisma } from 'generated/prisma/client';
import { pagination_prisma } from 'src/helpers/pagination/pagination.hp.prisma';
import { pagination_helper } from 'src/helpers/pagination/pagination.hp';
import { querySearchTest } from './dto/query-search-test';
import { testFilter } from 'src/filters';

@Injectable()
export class TestController {
  constructor(private readonly testService: TestService) {}

  async create(body: CreateTestDto) {
    const test = await this.testService.findOneByName(body.name);
    if (test)
      throw new BadRequestException(
        'Não é possivel criar esse teste pois um com esse nome já existe.',
      );
    return this.testService.create(body);
  }

  async findAll(querys: querySearchTest) {
    const page = +querys?.page;
    const limit = +querys?.limit;
    const orderBy: Prisma.testsOrderByWithAggregationInput = querys?.order ?? {
      createdAt: 'desc',
    };
    const where: Prisma.testsWhereInput = {
      deletedAt: null,
    };
    const filter: any = testFilter(querys);
    if (filter?.length) where.OR = filter;
    const include: Prisma.testsInclude = {};

    const data = await this.testService.findAll({
      where,
      orderBy,
      include,
      ...pagination_prisma(limit, page),
    });

    return pagination_helper(page, limit, data.count, data);
  }

  async findOne(id: string) {
    return await this.testService.findOne(id);
  }

  async update(id: string, body: UpdateTestDto) {
    const test = await this.testService.findOneByName(body.name);
    if (test)
      throw new BadRequestException(
        'Não é possivel Editar essa teste pois ja existe um com esse nome.',
      );
    return this.testService.update(id, body);
  }

  async remove(id: string) {
    return this.testService.remove(id);
  }
}
