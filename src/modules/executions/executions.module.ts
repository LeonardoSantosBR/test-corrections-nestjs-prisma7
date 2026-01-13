import { Module } from '@nestjs/common';
import { ExecutionsService } from './executions.service';
import { ExecutionsController } from './executions.controller';
import { ExecutionsRepository, TestsRepository } from 'src/repositories';
import { ExecutionsRouter } from './executions.routes';
import { TestService } from '../tests/test.service';
const providers = [
  ExecutionsController,
  ExecutionsService,
  ExecutionsRepository,
  TestService,
  TestsRepository,
];
@Module({
  controllers: [ExecutionsRouter],
  providers,
  exports: providers,
})
export class ExecutionsModule { }
