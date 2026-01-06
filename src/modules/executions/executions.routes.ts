import { Controller, Ip, Param, Post } from '@nestjs/common';
import { ExecutionsController } from './executions.controller';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('executions')
@Controller('executions')
export class ExecutionsRouter {
  constructor(private readonly executionsController: ExecutionsController) {}

  @Post('/:testId')
  async create(@Param('testId') testId: string, @Ip() ip: string) {
    return await this.executionsController.create(testId, ip);
  }
}
