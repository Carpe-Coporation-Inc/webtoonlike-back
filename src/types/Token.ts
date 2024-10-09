import { UserTypeT } from "@/types/User";

export interface TokenT {
  jti: string;
  sub: number;
  userType: UserTypeT;
  adminLevel: 0 | 1 | 2;
  iat: number;
  exp: number;
}

export interface TokenRsp {
  token: string;
}
