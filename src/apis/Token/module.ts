import { Module } from "@nestjs/common";
import { TokenController } from "./controller";
import { TokenService } from "./service";

@Module({
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}
