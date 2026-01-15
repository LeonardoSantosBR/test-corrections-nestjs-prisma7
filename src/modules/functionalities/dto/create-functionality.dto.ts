import {
  IsNotEmpty,
  IsString,
  IsJSON,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateFunctionalityDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsJSON()
  @IsNotEmpty()
  endpoints: any;

  @IsString()
  @IsNotEmpty()
  abbreviations: string;

  @IsString()
  @IsNotEmpty()
  tag: string;
}
