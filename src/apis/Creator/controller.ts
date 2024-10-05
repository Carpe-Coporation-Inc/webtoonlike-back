import {
  Controller, Post, Get, Patch,
  Body, Query,
  UseGuards,
  Param,
} from "@nestjs/common";
import { UserGuard } from "@/apis/$tools/guards";
import {
  GetCreatorDto,
  CreateCreatorDto,
  ListCreatorDto,
  GetThumbnailPresignedUrlDto,
  UpdateCreatorDto,
} from "./dtos";
import type * as R from "@/types/Creator.api";
import { CreatorService } from "./service";


@Controller("creators")
export class CreatorController {
  constructor(private readonly service: CreatorService) {}

  @Post("/")
  async create(
    @Body() body: CreateCreatorDto
  ): Promise<R.CreateRsp> {
    const { form } = body satisfies R.CreateRqs;
    const created = await this.service.create(form);
    return created;
  }

  @Get("/")
  async list(
    @Query() query: ListCreatorDto,
  ): Promise<R.ListRsp> {
    const listOpt = query satisfies R.ListRqs;
    const { data, nextCursor } = await this.service.list(listOpt);
    return { data, nextCursor };
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

  @Get("/:id")
  async get(
    @Query() query: GetCreatorDto,
    @Param("id") id: number,
  ): Promise<R.GetRsp> {
    const getOpt = query satisfies R.GetRqs;
    const fetched = await this.service.get(id, getOpt);
    return { data: fetched };
  }

  @Patch("/:id")
  async update(
    @Body() body: UpdateCreatorDto,
    @Param("id") id: number,
  ): Promise<R.CreateRsp> {
    const { form } = body satisfies R.UpdateRqs;
    const updated = await this.service.update(id, form);
    return updated;
  }

}