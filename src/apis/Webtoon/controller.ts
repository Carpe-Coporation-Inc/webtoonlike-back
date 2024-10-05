import {
  Controller, Post, Get, Patch,
  Body, Param, Query,
  UseGuards, ParseIntPipe
} from "@nestjs/common";
import { UserGuard } from "@/apis/$tools/guards";
import { User } from "@/apis/$tools/decorators";
import { WebtoonService } from "./service";
import {
  CreateWebtoonDto,
  UpdateWebtoonDto,
  ListWebtoonDto,
  GetWebtoonDto,
  GetThumbnailPresignedUrlDto,
} from "./dtos";
import * as err from "@/errors";
import type * as R from "@/types/Webtoon.api";
import type { UserT } from "@/types";


@Controller("webtoons")
export class WebtoonController {
  constructor(private readonly service: WebtoonService) {}

  @UseGuards(UserGuard)
  @Post("/")
  async create(
    @User() user: UserT,
    @Body() body: CreateWebtoonDto,
  ): Promise<R.CreateRsp> {
    const { form } = body satisfies R.CreateRqs;
    const created = await this.service.create(form);
    return created;
  }

  @Get("/")
  async list(
    @User() user: UserT|null,
    @Query() query: ListWebtoonDto,
  ): Promise<R.ListRsp> {
    const listOpt = query satisfies R.ListRqs;
    if (user) {
      listOpt.meId = user.id;
    }
    return await this.service.list(listOpt);
  }

  @Get("/:id")
  async get(
    @User() user: UserT|null,
    @Param("id", ParseIntPipe) id: idT,
    @Query() query: GetWebtoonDto
  ): Promise<R.GetRsp> {
    const getOpt = query satisfies R.GetRqs;
    if (user) {
      getOpt.meId = user.id;
    }
    const fetched = await this.service.get(id, getOpt);
    return { data: fetched };
  }


  @UseGuards(UserGuard)
  @Patch("/:id")
  async update(
    @User() user: UserT,
    @Param("id", ParseIntPipe) id: idT,
    @Body() body: UpdateWebtoonDto,
  ): Promise<R.UpdateRsp> {

    const { form } = body satisfies R.UpdateRqs;

    const item = await this.service.get(id);

    if (item.authorId !== user.id) {
      throw new err.ForbiddenE();
    }

    const updated = await this.service.update(id, form);

    return updated;
  }

  @UseGuards(UserGuard)
  @Post("/thumbnail/presigned-url")
  async getThumbnailPresignedUrl(
    @Body() body: GetThumbnailPresignedUrlDto,
  ): Promise<R.ThumbnailPresignedUrlRsp> {
    const { mimeType } = body satisfies R.ThumbnailPresignedUrlRqs;
    const { putUrl, key } = await this.service.getThumbnailPresignedUrl(mimeType);
    return { putUrl, key };
  }
}