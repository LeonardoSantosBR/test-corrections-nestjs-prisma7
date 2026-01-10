import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { sanitizeCpf } from 'src/helpers/sanitize-cpf.hp';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'O CPF é obrigatório' })
  @Transform(({ value }) => sanitizeCpf(value))
  cpf: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Tipo de usuário é obrigatório' })
  typeId?: number;
}
