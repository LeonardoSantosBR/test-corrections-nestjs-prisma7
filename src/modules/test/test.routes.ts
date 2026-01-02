import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { querySearchTest } from './dto/query-search-test';
import { TestController } from './test.controller';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('test')
@Controller('test')
export class TestRouter {
    constructor(private readonly testController: TestController) { }

    @Post('')
    async create(@Body() body: CreateTestDto) {
        return await this.testController.create(body);
    }

    @Get('/:id')
    async findOne(@Param('id') id: string) {
        return await this.testController.findOne(id);
    }

    @Get('')
    async findAll(@Query() querys: querySearchTest) {
        return await this.testController.findAll(querys);
    }

    @Patch('/:id')
    async update(@Body() body: UpdateTestDto, @Param('id') id: string) {
        return await this.testController.update(id, body);
    }

    @Delete('/:id')
    async remove(@Param('id') id: string) {
        return await this.testController.remove(id);
    }
}