import { Module } from '@nestjs/common';
import { TypesService } from './types.service';
import { TypesController } from './types.controller';
import { TypesRepository } from 'src/repositories';
import { TypesRouter } from './types.routes';
const providers = [TypesController, TypesService, TypesRepository];

@Module({
  controllers: [TypesRouter],
  providers,
  exports: providers,
})
export class TypesModule {}
