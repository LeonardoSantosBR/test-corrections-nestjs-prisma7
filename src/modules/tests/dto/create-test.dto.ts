import {
    IsString,
    IsNotEmpty,
    IsArray,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateQuestionDto } from './create-question.dto';

export class CreateTestDto {
    @IsString()
    @IsNotEmpty({ message: 'Nome obrigatório' })
    name: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateQuestionDto)
    questions: CreateQuestionDto[];
}
