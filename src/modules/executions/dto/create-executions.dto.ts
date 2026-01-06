import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateExecutionDto {
  @IsUUID()
  @IsNotEmpty()
  testId: string;

  @IsString()
  @IsNotEmpty()
  ip: string;

  @IsString()
  @IsNotEmpty()
  totalQuestions: string;

  @IsString()
  @IsNotEmpty()
  totalCorrect: string;

  @IsString()
  @IsNotEmpty()
  totalWrong: string;

  @IsString()
  @IsNotEmpty()
  resultPercentage: string;
}