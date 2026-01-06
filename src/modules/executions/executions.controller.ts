import { BadRequestException, Injectable } from '@nestjs/common';
import { ExecutionsService } from './executions.service';

@Injectable()
export class ExecutionsController {
  constructor(private readonly executionsService: ExecutionsService) {}

  async create(testId: string, ip: string) {
    if (!testId) throw new BadRequestException('Id do teste não enviado.');
    return this.executionsService.create(testId, ip);
  }
}
