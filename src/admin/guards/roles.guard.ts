import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // todo: rxjs를 안써봐서 Observable<boolean> 이게 무슨 의미인지 모르겠음
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    // const user = request.user; Auth관련 작업을 했다면 여기에 넣었겠지만 따로 안했으므로 주석하고 하드코딩으로...
    const user = {
      roles: ['admin', 'v2'],
    };
    return this.matchRoles(roles, user.roles);
  }

  // Guard섹션엔 따로 없어서 확인하려고 임시로 간단하게 만듦
  matchRoles(requireRoles: string[], userRoles: string[]): boolean {
    return requireRoles.every((el) => userRoles.includes(el));
  }
}
