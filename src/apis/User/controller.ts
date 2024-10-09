import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Query,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard, UserGuard, checkAdmin } from "@/apis/$tools/guards";
import { Sub } from "@/apis/$tools/decorators";
import { User } from "@/apis/$tools/decorators";
import { CreateUserDto, GetUserDto, ListUserDto } from "./dtos";
import { UserService } from "./service";
import type * as R from "@/types/User.api";
import type { UserT } from "@/types";

@Controller("users")
export class UserController {
  constructor(private readonly service: UserService) {}

  @UseGuards(AuthGuard)
  @Post("/me")
  async createMe(
    @Sub() sub: string,
    @Body() body: CreateUserDto
  ): Promise<R.CreateMeRsp> {
    const { form } = body satisfies R.CreateMeRqs;

    form.sub = sub;

    return this.service.createMe(form);
  }

  @Get("/me")
  async getMe(
    @User() user: UserT,
    @Query() query: GetUserDto
  ): Promise<R.GetMeRsp> {
    const getOpt = query satisfies R.GetMeRqs;
    const fetched = await this.service.getMe(user.id, getOpt);
    return { data: fetched };
  }

  @UseGuards(UserGuard)
  @Delete("/me")
  async deleteMe(@User() user: UserT): Promise<R.DeleteMeRsp> {
    await this.service.deleteMe(user.id);

    return true;
  }

  @UseGuards(UserGuard)
  @Get("/")
  async list(@User() user: UserT, @Query() query: ListUserDto): Promise<any> {
    await checkAdmin(user.id);

    const listOpt = query satisfies R.ListRqs;
    return await this.service.list(listOpt);
  }

  @UseGuards(UserGuard)
  @Get("/stats")
  async listStats(@User() user: UserT): Promise<any> {
    await checkAdmin(user.id);

    return await this.service.listStats();
  }
}
