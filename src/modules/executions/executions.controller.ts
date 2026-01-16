import { BadRequestException, Injectable } from '@nestjs/common';
import { ExecutionsService } from './executions.service';
import { TestService } from '../tests/test.service';
import { IAnswers } from 'src/types/answers';

@Injectable()
export class ExecutionsController {
  constructor(
    private readonly executionsService: ExecutionsService,
    private readonly testService: TestService,
  ) {}

  async create({
    answers,
    testId,
    req,
  }: {
    answers: Array<IAnswers>;
    testId: string;
    req: any;
  }) {
    if (!testId) throw new BadRequestException('Id do teste não enviado.');

    if (answers.length <= 0)
      throw new BadRequestException('Nenhuma pergunta respondida.');

    const body = {
      answers,
      testId,
      ip: req.ip,
      userId: req.user.id,
    };
    return this.executionsService.create(body);
  }

  async showTest(testId: string) {
    if (!testId) throw new BadRequestException('Id do teste não enviado.');
    const test = await this.testService.findOne(testId, {
      select: {
        name: true,
        questions: { select: { title: true, options: true } },
      },
    });
    return test;
  }
}
