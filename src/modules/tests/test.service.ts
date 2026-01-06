import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { TestsRepository } from 'src/repositories';
import { tests, Prisma } from 'generated/prisma/client';

@Injectable()
export class TestService {
  constructor(private readonly testRepository: TestsRepository) {}

  async create(data: CreateTestDto) {
    const { name, questions } = data;
    return await this.testRepository.create({
      name,
      questions: questions
        ? {
            create: data.questions.map((qs) => ({
              title: qs.title,
              rightOption: qs.rightOption,
              options: {
                create: qs.options.map((op) => ({
                  option: op.option,
                  description: op.description,
                })),
              },
            })),
          }
        : null,
    });
  }

  async findOne(id: string, arg?: Prisma.testsFindFirstArgs) {
    const where = arg?.where || { id, deletedAt: null };
    const query = await this.testRepository.findOne({
      where,
      ...arg,
    });

    return query;
  }

  async findOneByName(name: string, arg?: Prisma.testsFindFirstArgs) {
    const where = arg?.where || { name, deletedAt: null };
    const query = await this.testRepository.findOne({
      where,
      ...arg,
    });

    return query;
  }

  async findAll(params: Prisma.testsFindManyArgs) {
    const [rows, count]: [tests[], number] = await Promise.all([
      this.testRepository.findAll(params),
      this.testRepository.count({
        where: params.where || {},
      }),
    ]);
    return { rows, count };
  }

  async update(id: string, data: UpdateTestDto) {
    return `This action updates a #${id} test`;
  }

  async remove(id: string) {
    return await this.testRepository.delete({ where: { id } });
  }
}
