import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma/prisma-module';
import { TestModule } from './modules/test/test.module';

@Module({
  imports: [PrismaModule, TestModule],
  controllers: [],
  providers: [],
})
export class AppModule { }