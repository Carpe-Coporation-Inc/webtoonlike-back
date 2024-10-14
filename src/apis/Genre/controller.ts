import {
  Controller, Post, Get, Patch, Delete,
  Body, Param, Query,
  UseGuards, ParseIntPipe,
} from "@nestjs/common";
import { User } from "@/apis/$tools/decorators";
import { UserGuard, checkAdmin } from "@/apis/$tools/guards";
import {
  CreateGenreDto,
  GetGenreDto,
  ListGenreDto,
  UpdateGenreDto,
} from "./dtos";
import { GenreService } from "./service";
import type * as R from "@/types/Genre.api";
import type { UserT } from "@/types";


@Controller("genres")
export class GenreController {
  constructor(private readonly service: GenreService) {}


  @Get("/")
  async list(): Promise<R.ListRsp> {
    const { data, nextCursor } = await this.service.list();
    return { data, nextCursor };
  }

  @UseGuards(UserGuard)
  @Post("/")
  async create(
    @Body() body: CreateGenreDto,
    @User() user: UserT,
  ): Promise<R.CreateRsp> {
    const { form } = body satisfies R.CreateRqs;

    await checkAdmin(user.id);

    const created = await this.service.create(form);
    return created;
  }


  @Get("/:id")
  async get(
    @Param("id", ParseIntPipe) id: idT,
    @Query() query: GetGenreDto,
  ): Promise<R.GetRsp> {
    const getOpt = query satisfies R.GetRqs;
    const fetched = await this.service.get(id, getOpt);
    return { data: fetched };
  }

  @UseGuards(UserGuard)
  @Patch("/:id")
  async update(
    @User() user: UserT,
    @Param("id", ParseIntPipe) id: idT,
    @Body() body: UpdateGenreDto,
  ): Promise<R.UpdateRsp> {
    const { form } = body satisfies R.UpdateRqs;

    await checkAdmin(user.id);

    const updated = await this.service.update(id, form);
    return updated;
  }

  @UseGuards(UserGuard)
  @Delete("/:id")
  async remove(
    @User() user: UserT,
    @Param("id", ParseIntPipe) id: idT,
  ): Promise<R.DeleteRsp> {

    await checkAdmin(user.id);

    const removed = await this.service.remove(id);
    return removed;
  }

}