import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { expressjwt } from 'express-jwt';
import { expressJwtSecret, GetVerificationKey } from 'jwks-rsa';
import { Observable } from 'rxjs';
import { promisify } from 'util';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const req = context.getArgByIndex(0);
    const res = context.getArgByIndex(1);
    const checkJwt = promisify(
      expressjwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: ' '
        }) as GetVerificationKey,
        audience: '',
        algorithms: ['RS256']
      })
    )

    try {
      await checkJwt(req, res);
      return true
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}
