import {
  Controller,
  Post,
  Delete,
  UseGuards, Body,
} from "@nestjs/common";
import { AuthGuard, UserGuard } from "@/apis/$tools/guards";
import { TokenService } from "./service";
import type * as R from "@/types/Token";
import { CreateTokenDto } from "@/apis/Token/dtos";

@Controller("tokens")
export class TokenController {
  constructor(private readonly service: TokenService) {}

  @Post("/")
  async create(
    @Body() body: CreateTokenDto
  ): Promise<R.TokenRsp> {
    const { clerkToken } = body;
    return this.service.create(clerkToken);
  }

  @UseGuards(AuthGuard)
  @Delete("/")
  async revoke() {
    await this.service.revoke("user.id"); //TODO
  }
}
