import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsJSON,
} from 'class-validator';

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
