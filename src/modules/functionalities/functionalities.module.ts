import { Module } from '@nestjs/common';
import { FunctionalitiesService } from './functionalities.service';
import { FunctionalitiesController } from './functionalities.controller';
import { FunctionalitiesRepository } from 'src/repositories';
import { FunctionalitiesRouter } from './functionalities.routes';
const providers = [
  FunctionalitiesController,
  FunctionalitiesService,
  FunctionalitiesRepository,
];
@Module({
  controllers: [FunctionalitiesRouter],
  providers,
  exports: providers,
})
export class FunctionalitiesModule {}
