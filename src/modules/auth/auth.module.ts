import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { UsersRepository } from 'src/repositories';
import { AuthRouter } from './auth.routes';
import { HashService } from 'src/services/hash.service';
import { JwtService } from '@nestjs/jwt';
const providers = [
  AuthController,
  AuthService,
  UsersService,
  UsersRepository,
  HashService,
  JwtService
];

@Module({
  controllers: [AuthRouter],
  providers,
  exports: providers,
})
export class AuthModule {}
