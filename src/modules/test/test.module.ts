import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TestsRepository } from 'src/repositories';
import { TestRouter } from './test.routes';
import { PrismaService } from 'src/database/prisma/prisma-service';
const providers = [PrismaService, TestController, TestService, TestsRepository]

@Module({
  controllers: [TestRouter],
  providers,
  exports: providers
})
export class TestModule { }
