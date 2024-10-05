import {
  Controller, Post, Delete,
  Body, Param, Query,
  UseGuards,
} from "@nestjs/common";
import { UserGuard } from "@/apis/$tools/guards";
import { XWebtoonGenreService } from "./service";
import {
  CreateXWebtoonGenreDto,
  DeleteXWebtoonGenreDto,
  ResetByWebtoonDto,
} from "./dtos";
import type * as R from "@/types/XWebtoonGenre.api";


@Controller("x-webtoon-genres")
export class XWebtoonGenreController {
  constructor(private readonly service: XWebtoonGenreService) {}

  @UseGuards(UserGuard)
  @Post("/")
  async create(
    @Body() body: CreateXWebtoonGenreDto
  ): Promise<R.CreateRsp> {
    const { form } = body satisfies R.CreateRqs;
    const created = await this.service.create(form);
    return created;
  }

  @UseGuards(UserGuard)
  @Post("/reset-by-webtoon")
  async resetByWebtoon(
    @Body() body: ResetByWebtoonDto,
  ): Promise<R.ResetByWebtoonRsp> {
    const { webtoonId } = body satisfies R.ResetByWebtoonRqs;
    await this.service.resetByWebtoon(webtoonId);
    return true;
  }


  @UseGuards(UserGuard)
  @Delete("/")
  async remove(
    @Body() body: DeleteXWebtoonGenreDto
  ): Promise<R.DeleteRsp> {
    const { webtoonId, genreId } = body satisfies R.DeleteRqs;
    const deleted = await this.service.remove(webtoonId, genreId);
    return deleted;
  }

}