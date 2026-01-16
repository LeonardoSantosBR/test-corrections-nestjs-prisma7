import { BadRequestException, Injectable } from '@nestjs/common';
import { ExecutionsService } from './executions.service';
import { TestService } from '../tests/test.service';

@Injectable()
export class ExecutionsController {
  constructor(
    private readonly executionsService: ExecutionsService,
    private readonly testService: TestService,
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
    if (!testId) throw new BadRequestException('Id do teste não enviado.');

    if (answers.length <= 0)
      throw new BadRequestException('Nenhuma pergunta respondida.');

    const body = {
      answers,
      testId,
      ip,
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
