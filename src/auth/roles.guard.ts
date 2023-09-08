import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; // If no roles are specified, allow access
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assuming AuthGuard sets the user on the request
    // console.log("userr");
    
    // Check if the user has any of the required roles
    
    return roles.some((role) => user.role.includes(role));
  }
}
