import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from 'src/repositories';
import { Prisma, users } from 'generated/prisma/client';
import { HashService } from 'src/services/hash.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashService: HashService,
  ) {}

  async create(data: CreateUserDto) {
    const { password, typeId, ...rest } = data;
    const hashPassword = await this.hashService.encrypt(password);

    return this.usersRepository.create({
      ...rest,
      password: hashPassword,
      userTypes: {
        create: {
          type: {
            connect: { id: typeId },
          },
        },
      },
    });
  }

  async findAll(params: Prisma.usersFindManyArgs) {
    const [rows, count]: [users[], number] = await Promise.all([
      this.usersRepository.findAll(params),
      this.usersRepository.count({
        where: params.where || {},
      }),
    ]);
    return { rows, count };
  }

  async findOne(id: number, arg?: Prisma.usersFindFirstArgs) {
    const where = arg?.where || { id, deletedAt: null };
    const query = await this.usersRepository.findOne({
      where,
      ...arg,
    });

    return query;
  }

  async findOneByCpfOrEmail(cpf: string, email: string) {
    const query = await this.usersRepository.findOne({
      where: {
        OR: [{ cpf }, { email }],
      },
    });

    return query;
  }

  async update(id: number, data: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.usersRepository.delete({ where: { id } });
  }
}
