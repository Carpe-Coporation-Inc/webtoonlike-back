import {
  Controller, Post,
  Body, Delete, Param,
  UseGuards, ParseIntPipe,
} from "@nestjs/common";
import { UserGuard } from "@/apis/$tools/guards";
import { User } from "@/apis/$tools/decorators";
import {
  CreateWebtoonLikeDto,
} from "./dtos";
import { WebtoonLikeService } from "./service";
import { WebtoonService } from "../Webtoon/service";
import * as err from "@/errors";
import type * as R from "@/types/WebtoonLike.api";
import type { UserT } from "@/types";


@Controller("webtoon-likes")
export class WebtoonLikeController {
  constructor(
    private readonly service: WebtoonLikeService,
    private readonly webtoonService: WebtoonService,
  ) {}

  @UseGuards(UserGuard)
  @Post("/")
  async create(
    @User() user: UserT,
    @Body() body: CreateWebtoonLikeDto,
  ): Promise<R.CreateRsp> {
    const { form } = body;
    const created = await this.service.create({
      ...form,
      userId: user.id
    });

    this.webtoonService.updateAggr(created.webtoonId, { numLike: true })
      .catch((e) => console.warn("updateAggr error", e));

    return created;
  }

  @UseGuards(UserGuard)
  @Delete("/:id")
  async remove(
    @User() user: UserT,
    @Param("id", ParseIntPipe) id: idT,
  ): Promise<R.DeleteRsp> {
    const webtoonLike = await this.service.get(id);
    if (webtoonLike.userId !== user.id) {
      throw new err.ForbiddenE();
    }
    const deleted = await this.service.remove(id);

    this.webtoonService.updateAggr(deleted.webtoonId, { numLike: true })
      .catch((e) => console.warn("updateAggr error", e));

    return deleted;
  }


}