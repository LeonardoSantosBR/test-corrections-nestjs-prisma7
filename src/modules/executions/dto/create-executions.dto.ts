import { IsString, IsNotEmpty, IsUUID, IsNumber } from 'class-validator';

export class CreateExecutionDto {
  @IsUUID()
  @IsNotEmpty()
  testId: string;

  @IsString()
  @IsNotEmpty()
  ip: string;

  @IsNumber()
  @IsNotEmpty()
  totalQuestions: number;

  @IsNumber()
  @IsNotEmpty()
  totalCorrect: number;

  @IsNumber()
  @IsNotEmpty()
  totalWrong: number;

  @IsNumber()
  @IsNotEmpty()
  resultPercentage: number;
}
