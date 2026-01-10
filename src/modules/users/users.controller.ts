import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from 'generated/prisma/client';
import { pagination_prisma } from 'src/helpers/pagination/pagination.hp.prisma';
import { pagination_helper } from 'src/helpers/pagination/pagination.hp';
import { querySearchUser } from './dto/query-search-test';
import { userFilter } from 'src/filters';

@Injectable()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  async create(body: CreateUserDto) {
    const isUserAlreadyExists = await this.usersService.findOneByCpfOrEmail(
      body.cpf,
      body.email,
    );
    if (isUserAlreadyExists)
      throw new BadRequestException('Usuário com Cpf ou Email já existentes');

    return this.usersService.create(body);
  }

  async findAll(querys: querySearchUser) {
    const page = +querys?.page;
    const limit = +querys?.limit;
    const orderBy: Prisma.usersOrderByWithAggregationInput = querys?.order ?? {
      createdAt: 'desc',
    };
    const where: Prisma.usersWhereInput = {
      deletedAt: null,
    };
    const filter: any = userFilter(querys);
    if (filter?.length) where.OR = filter;
    const include: Prisma.usersInclude = {};

    const data = await this.usersService.findAll({
      where,
      orderBy,
      include,
      ...pagination_prisma(limit, page),
    });

    return pagination_helper(page, limit, data.count, data);
  }

  findOne(id: number) {
    return this.usersService.findOne(id);
  }

  update(id: number, body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }

  remove(id: number) {
    return this.usersService.remove(id);
  }
}
