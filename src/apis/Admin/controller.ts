import {
  Controller, Post, Get, Delete,
  Body, Param, Query,
  UseGuards, ParseIntPipe,
} from "@nestjs/common";
import { UserGuard, SystemGuard, checkAdmin } from "@/apis/$tools/guards";
import { User } from "@/apis/$tools/decorators";
import {
  CreateAdminDto,
  CreateByEmailDto,
  ListAdminDto,
} from "./dtos";
import * as R from "@/types/Admin.api";
import * as err from "@/errors";
import { AdminService } from "./service";
import type { UserT } from "@/types";


@Controller("admins")
export class AdminController {
  constructor(private readonly service: AdminService) {}

  @UseGuards(SystemGuard)
  @Post("/")
  async create(
    @Body() body: CreateAdminDto,
  ): Promise<R.CreateRsp> {
    const { form } = body satisfies R.CreateRqs;

    const created = await this.service.create(form);
    return created;
  }

  @UseGuards(UserGuard)
  @Post("/by-email")
  async createByEmail(
    @User() user: UserT,
    @Body() body: CreateByEmailDto,
  ): Promise<R.CreateByEmailRsp> {
    const { email } = body satisfies R.CreateByEmailRqs;

    await checkAdmin(user.id);

    const created = await this.service.createByEmail(email);
    return created;
  }

  @Get("/me")
  async getMe(
    @User() user: UserT|null,
  ): Promise<R.GetMeRsp> {

    if (!user) {
      return { data: null };
    }

    const fetched = await this.service.getMe(user.id);
    return { data: fetched };
  }

  @UseGuards(UserGuard)
  @Get("/")
  async list(
    @Query() query: ListAdminDto,
  ): Promise<R.ListRsp> {
    const listOpt = query satisfies R.ListRqs;
    return await this.service.list(listOpt);
  }


  @Get("/load-media")
  async loadMedia(
    @Query("key") key: string,
  ): Promise<R.LoadMediaRsp> {
    const data = await this.service.loadMedia(key);
    if (!data) {
      throw new err.NotExistE(`media with key ${key} not found`);
    }
    return { data };
  }

  @UseGuards(UserGuard)
  @Delete("/:id")
  async remove(
    @User() user: UserT,
    @Param("id", ParseIntPipe) id: number,
  ): Promise<R.DeleteRsp> {
    await checkAdmin(user.id);

    const admin = await this.service.get(id);

    if (admin.isSuper) {
      throw new err.InvalidActionE("super admin cannot be deleted");
    }

    if (admin.userId == user.id) {
      throw new err.InvalidActionE("cannot delete yourself");
    }

    const removed = await this.service.remove(id);
    return removed;
  }


}