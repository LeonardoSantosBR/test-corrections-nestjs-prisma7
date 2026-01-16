import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
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
    @Req() req,
  ) {
    return await this.executionsController.create({
      answers: body.answers,
      testId,
      req,
    });
  }

  @Get('/show-test/:testId')
  async showTest(@Param('testId') testId: string) {
    return await this.executionsController.showTest(testId);
  }
}
