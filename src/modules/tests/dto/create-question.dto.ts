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
  @IsNotEmpty({ message: 'Título obrigatório' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Questão correta obrigatória' })
  rightOption: string;

  @IsJSON()
  @IsNotEmpty()
  options: any;
}
