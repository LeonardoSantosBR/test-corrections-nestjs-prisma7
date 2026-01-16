import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTypeDto {
  @IsBoolean()
  @IsNotEmpty()
  standard: boolean;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsOptional()
  @IsInt({ each: true })
  functionalitiesIds: Array<number>;
}
