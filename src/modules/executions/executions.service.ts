import { Injectable } from '@nestjs/common';
import { ExecutionsRepository } from 'src/repositories';

@Injectable()
export class ExecutionsService {
  constructor(private readonly executionsRepository: ExecutionsRepository) {}

  async create(testId: string, ip: string) {}
}
