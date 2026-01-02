import { IsString, IsNotEmpty } from 'class-validator';

export class CreateOptionDto {
    @IsString()
    @IsNotEmpty()
    option: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}