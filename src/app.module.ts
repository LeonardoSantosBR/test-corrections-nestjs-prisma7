import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma/prisma-module';
import { TestModule } from './modules/tests/test.module';
import { ConfigModule } from '@nestjs/config';
import { ExecutionsModule } from './modules/executions/executions.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [PrismaModule, TestModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }), ExecutionsModule, UsersModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }