import { Body, Controller, Ip, Param, Post } from '@nestjs/common';
import { ExecutionsController } from './executions.controller';
import { ApiTags } from '@nestjs/swagger';
import { CreateAnswersDto } from './dto/create-answers.dto';

@ApiTags('executions')
@Controller('executions')
export class ExecutionsRouter {
  constructor(private readonly executionsController: ExecutionsController) {}

  @Post('/:testId')
  async create(
    @Body() body: CreateAnswersDto,
    @Param('testId') testId: string,
    @Ip() ip: string,
  ) {
    return await this.executionsController.create({
      answers: body.answers,
      testId,
      ip,
    });
  }
}
