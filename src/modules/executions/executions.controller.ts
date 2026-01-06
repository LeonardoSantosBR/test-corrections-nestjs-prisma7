import { BadRequestException, Injectable } from '@nestjs/common';
import { ExecutionsService } from './executions.service';

@Injectable()
export class ExecutionsController {
  constructor(private readonly executionsService: ExecutionsService) {}

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
      throw new BadRequestException('Nenhuma Resposta respondida.');

    const body = {
      answers,
      testId,
      ip,
    };
    return this.executionsService.create(body);
  }
}
