import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async getCredentials({
    id,
    name,
    cpf,
    type,
  }: {
    id: number;
    name: string;
    cpf: string;
    type: {
      id: number;
      name: string;
      standard: boolean;
      functionalities: Array<{ name: string; endpoints: any }>;
    };
  }) {
    const access_token = this.jwtService.sign(
      {
        id,
        name,
        cpf,
        type,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '1H',
      },
    );

    const refresh_token: string = uuidv4();

    return {
      access_token,
      refresh_token,
    };
  }
}
