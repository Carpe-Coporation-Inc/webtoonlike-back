import {
  Controller, Post,
  Delete, Param,
  UseGuards, ParseIntPipe,
} from "@nestjs/common";
import { UserGuard } from "@/apis/$tools/guards";
import { UserId } from "@/apis/$tools/decorators";
import { WebtoonLikeService } from "./service";
import { WebtoonService } from "../Webtoon/service";
import type * as R from "@/types/WebtoonLike.api";


@Controller("webtoon-likes")
export class WebtoonLikeController {
  constructor(
    private readonly service: WebtoonLikeService,
    private readonly webtoonService: WebtoonService,
  ) {}

  @UseGuards(UserGuard)
  @Post("/:id")
  async create(
    @UserId() userId: idT,
    @Param("id", ParseIntPipe) id: idT,
  ): Promise<R.CreateRsp> {
    await this.service.create(id, userId);

    // TODO 필요한 동작인가?
    this.webtoonService.updateAggr(id, { numLike: true })
      .catch((e) => console.warn("updateAggr error", e));
  }

  @UseGuards(UserGuard)
  @Delete("/:id")
  async remove(
    @UserId() userId: idT,
    @Param("id", ParseIntPipe) id: idT,
  ): Promise<R.DeleteRsp> {
    await this.service.remove(id, userId);

    this.webtoonService.updateAggr(id, { numLike: true })
      .catch((e) => console.warn("updateAggr error", e));
  }


}