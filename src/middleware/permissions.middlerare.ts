import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class PermissionsMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization.split(' ')[1];
    const userDt = await this.jwtService.decode(token);

    if (!userDt?.type?.functionalities) {
      throw new ForbiddenException('Usuário sem permissões');
    }

    const url = req.originalUrl;
    const method = req.method;

    const hasPermission = userDt.type.functionalities.some((func) =>
      func.endpoints.some(
        (end) => this.matchRoute(end.path, url) && end.method === method,
      ),
    );

    if (!hasPermission && userDt.type.standard == false) {
      throw new ForbiddenException('Acesso negado a esta rota');
    }
    next();
  }

  private matchRoute(permissionPath: string, requestPath: string): boolean {
    const permissionParts = permissionPath.split('/');
    const requestParts = requestPath.split('/');

    if (permissionParts.length !== requestParts.length) {
      return false;
    }

    return permissionParts.every((part, index) => {
      if (part.startsWith(':')) {
        return true;
      }
      return part === requestParts[index];
    });
  }
}
