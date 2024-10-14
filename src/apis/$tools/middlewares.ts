import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { userM } from "@/models/User";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { env } from "@/env";


@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const cookies = req.cookies;

      const token = cookies["__session"];
      if (!token) {
        return next();
      }

      if (env.STAGE == "dev" && req.headers["fake-uid"]) {
        const uid = req.headers["fake-uid"] as string;
        const user = await userM.findById(parseInt(uid));
        (req as any).sub = user.sub;
        (req as any).user = user;
        return next();
      }

      const publicKey = (env.CLERK_PEM_PUBLIC_KEY ?? "").replace(/\^/g, "\n");
      const decoded = jwt.verify(token, publicKey );
      // console.log("decoded: ", decoded);
      const user = await userM.findOne({ sub: decoded.sub as string });

      (req as any).sub = decoded.sub;
      (req as any).user = user;

      return next();


    } catch (e) {
      if (e instanceof TokenExpiredError) {
        return next();
      }
      console.warn(e);
      // throw new err.UnauthorizedE("invalid user token");
      return next();
    }
  }
}
