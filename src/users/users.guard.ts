import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { expressJwtSecret } from 'jwks-rsa'
import { promisify } from 'util';
import * as jwt from 'express-jwt';

@Injectable()
export class UsersGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> {
    
    return true;
  }
}
