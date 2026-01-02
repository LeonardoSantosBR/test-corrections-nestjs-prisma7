import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma/prisma-module';
import { TestModule } from './modules/test/test.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, TestModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),],
  controllers: [],
  providers: [],
})
export class AppModule { }