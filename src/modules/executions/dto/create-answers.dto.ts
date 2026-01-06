import { IsJSON } from 'class-validator';

export class CreateAnswersDto {
  @IsJSON()
  answers: any;
}
