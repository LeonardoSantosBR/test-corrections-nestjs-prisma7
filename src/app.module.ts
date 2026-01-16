import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PrismaModule } from './database/prisma/prisma-module';
import { TestModule } from './modules/tests/test.module';
import { ConfigModule } from '@nestjs/config';
import { ExecutionsModule } from './modules/executions/executions.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { FunctionalitiesModule } from './modules/functionalities/functionalities.module';
import { TypesModule } from './modules/types/types.module';
import { PermissionsMiddleware } from './middleware/permissions.middlerare';

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
    TypesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PermissionsMiddleware)
      .exclude({ path: 'auth/(.*)', method: RequestMethod.ALL })
      .forRoutes('*');
  }
}
