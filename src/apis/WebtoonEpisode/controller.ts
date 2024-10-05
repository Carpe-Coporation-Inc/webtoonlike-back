import {
  Controller, Post, Get, Patch,
  Body, Param, Query,
  UseGuards, ParseIntPipe,
} from "@nestjs/common";
import { User } from "@/apis/$tools/decorators";
import { UserGuard, checkIsAdmin } from "@/apis/$tools/guards";
import {
  CreateWebtoonEpisodeDto,
  UpdateWebtoonEpisodeDto,
  ListWebtoonEpisodeDto,
  GetWebtoonEpisodeDto,
  GetThumbnailPresignedUrlDto,
} from "./dtos";
import { WebtoonEpisodeService } from "./service";
import * as err from "@/errors";
import type * as R from "@/types/WebtoonEpisode.api";
import type { UserT } from "@/types";


@Controller("webtoon-episodes")
export class WebtoonEpisodeController {
  constructor(private readonly service: WebtoonEpisodeService) {}

  @UseGuards(UserGuard)
  @Post("/")
  async create(
    @Body() body: CreateWebtoonEpisodeDto,
  ): Promise<R.CreateRsp> {
    const { form, relations } = body satisfies R.CreateRqs;
    const created = await this.service.create(form, relations);
    return created;
  }


  @Get("/")
  async list(
    @Query() query: ListWebtoonEpisodeDto,
  ) {
    const listOpt = query satisfies R.ListRqs;
    const { data, nextCursor } = await this.service.list(listOpt);
    return { data, nextCursor };
  }

  @UseGuards(UserGuard)
  @Patch("/:id")
  async update(
    @User() user: UserT,
    @Param("id", ParseIntPipe) id: idT,
    @Body() body: UpdateWebtoonEpisodeDto,
  ): Promise<R.UpdateRsp> {

    const { form, relations } = body satisfies R.UpdateRqs;

    const episode = await this.service.get(id);

    const admin = await checkIsAdmin(user.id);

    if (admin == null && episode.authorId !== user.id) {
      throw new err.ForbiddenE("only author or admin can update episode");
    }
    const updated = await this.service.update(id, form, relations);

    return updated;
  }


  @Get("/:id")
  async get(
    @Param("id", ParseIntPipe) id: idT,
    @Query() query: GetWebtoonEpisodeDto
  ) {
    const getOpt = query satisfies R.GetRqs;
    const fetched = await this.service.get(id, getOpt);
    return { data: fetched };
  }

  @Post("/thumbnail/presigned-url")
  async getThumbnailPresignedUrl(
    @Body() body: GetThumbnailPresignedUrlDto,
  ): Promise<R.ThumbnailPresignedUrlRsp> {

    const { mimeType } = body satisfies R.ThumbnailPresignedUrlRqs;
    const { putUrl, key } = await this.service.getThumbnailPresignedUrl(mimeType);
    return { putUrl, key };

  }


}