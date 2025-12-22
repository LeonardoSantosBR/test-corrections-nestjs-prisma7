import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { TestsRepository } from 'src/repositories';

@Injectable()
export class TestService {
  constructor(private readonly testRepository: TestsRepository) { }

  async create(createTestDto: CreateTestDto) {
    return 'This action adds a new test';
  }

  async findAll() {
    return `This action returns all test`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} test`;
  }

  async update(id: number, updateTestDto: UpdateTestDto) {
    return `This action updates a #${id} test`;
  }

  async remove(id: number) {
    return `This action removes a #${id} test`;
  }
}
