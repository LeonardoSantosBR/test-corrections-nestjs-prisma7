import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TestsRepository } from 'src/repositories';
const providers = [TestService, TestsRepository]

@Module({
  controllers: [TestController],
  providers,
  exports: providers
})
export class TestModule { }
