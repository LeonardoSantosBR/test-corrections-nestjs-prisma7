import { Injectable } from '@nestjs/common';
import { TypesService } from './types.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Prisma } from 'generated/prisma/client';
import { pagination_prisma } from 'src/helpers/pagination/pagination.hp.prisma';
import { pagination_helper } from 'src/helpers/pagination/pagination.hp';
import { querySearchTypes } from './dto/query-search-types';
import { typesFilter } from 'src/filters';

@Injectable()
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  async create(body: CreateTypeDto) {
    return this.typesService.create(body);
  }

  async findAll(querys: querySearchTypes) {
    const page = +querys?.page;
    const limit = +querys?.limit;
    const orderBy: Prisma.typesOrderByWithAggregationInput = querys?.order ?? {
      createdAt: 'desc',
    };
    const where: Prisma.typesWhereInput = {
      deletedAt: null,
    };
    const filter: any = typesFilter(querys);
    if (filter?.length) where.OR = filter;
    const include: Prisma.typesInclude = {};

    const data = await this.typesService.findAll({
      where,
      orderBy,
      include,
      ...pagination_prisma(limit, page),
    });

    return pagination_helper(page, limit, data.count, data);
  }

  async update(id: number, body: UpdateTypeDto) {
    return this.typesService.update(+id, body);
  }

  async remove(id: number) {
    return this.typesService.remove(+id);
  }
}
