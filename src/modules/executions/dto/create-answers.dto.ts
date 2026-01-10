import { IsJSON, IsNotEmpty } from 'class-validator';

export class CreateAnswersDto {
  @IsNotEmpty({ message: 'Respostas são obrigatórias' })
  @IsJSON()
  answers: any;
}
