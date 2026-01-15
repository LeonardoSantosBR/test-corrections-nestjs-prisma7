import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/database/prisma/prisma-service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.usersCreateInput) {
    const new_user = await this.prisma.users.create({ data });
    return new_user;
  }

  async findAll(params: Prisma.usersFindManyArgs) {
    const query = await this.prisma.users.findMany(params);
    return query;
  }

  async count(params: Prisma.usersCountArgs): Promise<number> {
    const query = await this.prisma.users.count(params);
    return query;
  }

  async findOne(params: Prisma.usersFindFirstArgs) {
    const query = await this.prisma.users.findFirst(params);
    return query;
  }

  async update(params: Prisma.usersUpdateArgs) {
    await this.prisma.users.update(params);
    return true;
  }

  async delete(params: Prisma.usersDeleteArgs) {
    await this.prisma.users.delete(params);
    return true;
  }
}
