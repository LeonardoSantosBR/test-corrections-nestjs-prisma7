import { IsInt, IsNotEmpty, IsString, IsObject, IsJSON } from 'class-validator';

export class CreateFunctionalityDto {
    @IsInt()
    @IsNotEmpty()
    typeId: number;

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