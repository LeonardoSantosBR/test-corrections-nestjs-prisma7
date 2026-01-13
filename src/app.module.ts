import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma/prisma-module';
import { TestModule } from './modules/tests/test.module';
import { ConfigModule } from '@nestjs/config';
import { ExecutionsModule } from './modules/executions/executions.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { FunctionalitiesModule } from './modules/functionalities/functionalities.module';

@Module({
  imports: [
    PrismaModule,
    TestModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ExecutionsModule,
    UsersModule,
    AuthModule,
    FunctionalitiesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
