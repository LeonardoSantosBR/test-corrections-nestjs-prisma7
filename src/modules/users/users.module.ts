import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from 'src/repositories';
import { UsersRouter } from './users.routes';
import { HashService } from 'src/services/hash.service';
const providers = [UsersController, UsersService, UsersRepository, HashService];

@Module({
  controllers: [UsersRouter],
  providers,
  exports: providers,
})
export class UsersModule {}
