import {
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsNumber,
  IsOptional,
  IsJSON,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOptionDto } from './create-option.dto';

export class CreateQuestionDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  rightOption: string;

  @IsJSON()
  @IsNotEmpty()
  options: any;
}
