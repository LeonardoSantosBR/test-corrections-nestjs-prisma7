import { IsArray, IsNotEmpty } from 'class-validator';
import { IAnswers } from 'src/types/answers';

export class CreateAnswersDto {
  @IsNotEmpty({ message: 'Respostas são obrigatórias' })
  @IsArray()
  answers: Array<IAnswers>;
}
