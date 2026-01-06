import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { ExecutionsRepository, TestsRepository } from 'src/repositories';
import { CreateExecutionDto } from './dto/create-executions.dto';

@Injectable()
export class ExecutionsService {
  constructor(
    private readonly executionsRepository: ExecutionsRepository,
    private readonly testRepository: TestsRepository,
  ) {}

  async create({
    answers,
    testId,
    ip,
  }: {
    answers: any;
    testId: string;
    ip: string;
  }) {
    const test: any = await this.testRepository.findOne({
      where: { id: testId },
      select: { questions: { select: { id: true, rightOption: true } } },
    });

    let totalCorrect = 0;
    let totalWrong = 0;

    for (const q of test.questions) {
      const was_answered = answers.find((r) => q.id == r.questionId);
      if (was_answered && was_answered.response == q.rightOption) {
        totalCorrect += 1;
      } else {
        totalWrong += 1;
      }
    }

    const data: Prisma.executionsCreateInput = {
      ip,
      test: {
        connect: {
          id: testId,
        },
      },
      resultPercentage: (totalCorrect / test.questions.length) * 100,
      totalCorrect,
      totalWrong,
      totalQuestions: test.questions.length,
    };
    return await this.executionsRepository.create(data);
  }
}
