import { IsNotEmpty, IsString, IsJSON } from 'class-validator';

export class CreateFunctionalityDto {
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
