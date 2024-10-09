import { v4 as uuidv4 } from "uuid";
import { Injectable } from "@nestjs/common";
import { sessionM } from "@/models/Session";
import type {
  UserT,
} from "@/types";
import { TokenRsp, TokenT } from "@/types/Token";
import { adminM } from "@/models/Admin";
import { knex } from "@/global/db";
import jwt from "jsonwebtoken";
import { env } from "@/env";
import { userM } from "@/models/User";
import { verifyToken } from "@clerk/backend";

@Injectable()
export class TokenService {
  constructor() {}

  async create(clerkToken: string): Promise<TokenRsp> {
    // 유저 찾기
    console.log(345);
    const decoded = await verifyToken(clerkToken, {
      secretKey: env.CLERK_PEM_PUBLIC_KEY
    });
    const user = await userM.findOne({ sub: decoded.sub as string });

    if (!user) {
      // TODO Error code 정리
      throw new Error("error");
    }

    // 토큰 발급
    const now = new Date();
    const expiration = new Date(now.getTime());
    expiration.setDate(expiration.getDate() + 1); // 하루 후 만료
    const session = await sessionM.create({
      jti: uuidv4(),
      userId: user.id,
      expires: expiration,
      revoked: false
    });
    const admin = await adminM.findOne({ id: user.id });
    const adminLevel = admin ? (admin.isSuper ? 2 : 1) : 0;
    const tokenData: TokenT = {
      jti: session.jti,
      sub: user.id,
      userType: user.userType,
      adminLevel,
      iat: Math.floor(now.getTime() / 1000),
      exp: Math.floor(expiration.getTime() / 1000)
    };
    const token = jwt.sign(tokenData, env.TOKEN_SECRET_KEY, {
      algorithm: "HS256"
    });
    return { token };
  }

  async revoke(jti: string) {
    await sessionM.updateOne({ jti }, { revoked: true });
  }

  // TODO
  async deleteExpired() {
    const now = new Date();
    await knex(sessionM.table).where("expires", "<", now).del();
  }
}
