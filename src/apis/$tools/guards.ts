import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import * as err from "@/errors";
import { env } from "@/env";

@Injectable()
export class SystemGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const isSystem = request.headers["x-system-secret"] == env.SYSTEM_SECRET;
    if (isSystem == false) {
      throw new err.ForbiddenE("invalid system secret");
    }
    return true;
  }
}


@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (!request.sub) {
      throw new err.UnauthorizedE("no user credential found");
    }
    return true;
  }
}


@Injectable()
export class UserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      throw new err.UnauthorizedE("no user credential found");
    }
    return true;
  }
}


import { adminM } from "@/models/Admin";
import type { AdminT } from "@/types";


export async function checkAdmin(userId: number, roles: Partial<AdminT> = {}): Promise<AdminT> {
  const admin = await adminM.findOne({ userId: userId });
  if (!admin) {
    throw new err.ForbiddenE("user need to be admin");
  }
  for (const key of Object.keys(roles)) {
    if (admin[key as keyof AdminT] !== roles[key as keyof AdminT]) {
      throw new err.ForbiddenE(`key ${key} need to be ${roles[key as keyof AdminT]}`);
    }
  }
  return admin;
}

export async function checkIsAdmin(userId: number, role: Partial<AdminT> = {}): Promise<AdminT|null> {
  try {
    return await checkAdmin(userId, role);
  } catch (e) {
    return null;
  }
}