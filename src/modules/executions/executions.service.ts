import { Injectable } from '@nestjs/common';
import { ExecutionsRepository, TestsRepository } from 'src/repositories';
import { IAnswers } from 'src/types/answers';
import { Req } from '@nestjs/common';

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
    userId,
  }: {
    answers: Array<IAnswers>;
    testId: string;
    ip: string;
    userId: number;
  }) {
    const test: any = await this.testRepository.findOne({
      where: { id: testId },
      select: { questions: { select: { id: true, rightOption: true } } },
    });

    let totalCorrect = 0,
      totalWrong = 0;

    for (const q of test.questions) {
      const was_answered = answers.find((r) => q.id == r.questionId);
      was_answered && was_answered.response == q.rightOption
        ? totalCorrect++
        : totalWrong++;
    }

    await this.executionsRepository.create({
      ip,
      user: {
        connect: {
          id: userId,
        },
      },
      test: {
        connect: {
          id: testId,
        },
      },
      resultPercentage: (totalCorrect / test.questions.length) * 100,
      totalCorrect,
      totalWrong,
      totalQuestions: test.questions.length,
    });
    return true;
  }
}
