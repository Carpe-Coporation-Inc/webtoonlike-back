import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { UserT } from "@/types/User";
import * as err from "@/errors";


export const Sub = createParamDecorator(
  (option: unknown, ctx: ExecutionContext): string|null|undefined => {
    const request = ctx.switchToHttp().getRequest();
    return request.sub; // extract token from request
  },
);

type UserOptionT = {
  force?: boolean;
}

export const User = createParamDecorator(
  (option: UserOptionT, ctx: ExecutionContext): UserT|null|undefined => {
    const request = ctx.switchToHttp().getRequest();
    if (option?.force && !request.user) {
      throw new err.UnauthorizedE("invalid user token");
    }
    return request.user; // extract token from request
  },
);

