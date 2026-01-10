import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { TestsRepository } from 'src/repositories';
import { tests, Prisma } from 'generated/prisma/client';
import { CreateQuestionDto } from './dto/create-question.dto';

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
              options: qs.options,
            })),
          }
        : null,
    });
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

  async update(id: string, data: UpdateTestDto) {
    const test: any = await this.testRepository.findOne({
      where: { id },
      select: { questions: true },
    });

    const questions_with_id = data.questions.filter((q) => q.id);
    const questions_without_id = data.questions.filter((q) => !q.id);
    await Promise.all([
      this.updateManyQuestionsExisting(questions_with_id),
      this.createManyQuestions(id, questions_without_id),
    ]);

    const payload_ids = questions_with_id.map((q) => q.id);
    const idsToDelete = test.questions
      .filter((q) => !payload_ids.includes(q.id))
      .map((q) => q.id);

    await this.testRepository.questionsDeleteMany({
      where: {
        id: { in: idsToDelete },
      },
    });

    return true;
  }

  async remove(id: string) {
    return await this.testRepository.delete({ where: { id } });
  }

  async updateManyQuestionsExisting(questions_with_id: CreateQuestionDto[]) {
    for (const question of questions_with_id) {
      await this.testRepository.updateQuestion({
        where: { id: question.id },
        data: {
          title: question.title,
          rightOption: question.rightOption,
          options: question.options,
          updatedAt: new Date(),
        },
      });
    }
  }

  async createManyQuestions(
    id: string,
    questions_without_id: CreateQuestionDto[],
  ) {
    for (const question of questions_without_id) {
      await this.testRepository.createQuestion({
        data: {
          title: question.title,
          rightOption: question.rightOption,
          options: question.options,
          test: {
            connect: {
              id,
            },
          },
        },
      });
    }
  }
}
