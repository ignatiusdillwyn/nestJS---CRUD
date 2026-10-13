import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface JwtUser {
  userId: number;
  email: string;
  fullName: string;
}

export const CurrentUser = createParamDecorator(
  (data: keyof JwtUser | undefined, ctx: ExecutionContext): JwtUser | any => {
    const request = ctx.switchToHttp().getRequest();
    const user: JwtUser = request.user;
    return data ? user?.[data] : user;
  },
);