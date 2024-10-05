import {
  Controller, Post, Get, Delete,
  Body, Param, Query,
  UseGuards, ParseIntPipe,
} from "@nestjs/common";
import { WebtoonEpisodeImageService } from "./service";
import { UserGuard } from "@/apis/$tools/guards";
import {
  CreateWebtoonEpisodeImageDto,
  ListWebtoonEpisodeImageDto,
  GetImagePresignedUrlDto,
} from "./dtos";
import type * as R from "@/types/WebtoonEpisodeImage.api";

@Controller("webtoon-episode-images")
export class WebtoonEpisodeImageController {
  constructor(private readonly service: WebtoonEpisodeImageService) {}

  @UseGuards(UserGuard)
  @Post("/")
  async create(
    @Body() body: CreateWebtoonEpisodeImageDto,
  ): Promise<R.CreateRsp> {
    const { form } = body satisfies R.CreateRqs;
    const created = await this.service.create(form);
    return created;
  }

  @Get("/")
  async list(
    @Query() query: ListWebtoonEpisodeImageDto,
  ): Promise<R.ListRsp> {
    const listOpt = query satisfies R.ListRqs;
    return await this.service.list(listOpt);
  }

  @UseGuards(UserGuard)
  @Delete("/:id")
  async remove(
    @Param("id", ParseIntPipe) id: idT,
  ): Promise<R.RemoveRsp> {
    const removed = await this.service.remove(id);
    return removed;
  }

  @UseGuards(UserGuard)
  @Post("/presigned-url")
  async getPresignedUrl(
    @Body() body: GetImagePresignedUrlDto,
  ): Promise<R.GetPresignedUrlRsp> {
    const { mimeType } = body satisfies R.GetPresignedUrlRqs;
    const { putUrl, key } = await this.service.getPresignedUrl(mimeType);
    return { putUrl, key };
  }
}