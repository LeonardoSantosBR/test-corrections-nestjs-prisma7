import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { UsersService } from '../users/users.service';
import { HashService } from 'src/services/hash.service';

@Injectable()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
  ) {}

  async signin(data: SigninAuthDto) {
    const { cpf, password } = data;
    const user: any = await this.usersService.findOne(undefined, {
      where: { cpf },
      select: {
        id: true,
        cpf: true,
        name: true,
        password: true,
        userTypes: {
          select: {
            type: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    if (!user) throw new UnauthorizedException('Usuário não encontrado.');
    const passValid = await this.hashService.compare(password, user.password);
    if (!passValid) throw new UnauthorizedException('Senha inválida.');
    return this.authService.getCredentials({
      id: user.id,
      name: user.name,
      cpf: user.cpf,
      type: {
        id: user.userTypes.type.id,
        name: user.userTypes.type.name
      },
    });
  }
}
