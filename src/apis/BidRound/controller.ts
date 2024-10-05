import {
  Controller, Post, Patch, Get,
  Body, Param, Query,
  UseGuards, ParseIntPipe,
} from "@nestjs/common";
import { UserGuard, checkAdmin } from "@/apis/$tools/guards";
import { User } from "@/apis/$tools/decorators";
import { notifier } from "@/apis/$runners/notifier";
import { BidRoundService } from "./service";
import {
  ListBidRoundDto,
  GetBidRoundDto,
  CreateBidRoundDto,
  UpdateBidRoundDto,
  ApproveBidRoundDto,
  DisapproveBidRoundDto
} from "./dtos";
import { checkBidRoundValidity } from "./fncs/check_validity";
import * as err from "@/errors";
import type * as R from "@/types/BidRound.api";
import type { UserT, BidRoundT } from "@/types";


@Controller("bid-rounds")
export class BidRoundController {
  constructor(private readonly service: BidRoundService) {}

  @UseGuards(UserGuard)
  @Post("/")
  async create(
    @Body() body: CreateBidRoundDto,
    @User() user: UserT,
  ): Promise<R.CreateRsp> {
    const { form } = body satisfies R.CreateRqs;

    if (form.userId !== user.id) {
      throw new err.InvalidDataE("form.userId not matching");
    }
    const created = await this.service.create(form);

    return created;
  }

  @Get("/")
  async list(
    @User() user: UserT|null,
    @Query() query: ListBidRoundDto,
  ): Promise<R.ListRsp> {
    const listOpt = query satisfies R.ListRqs;
    if (user) {
      listOpt.meId = user.id;
    }

    return await this.service.list(listOpt);
  }


  @UseGuards(UserGuard)
  @Post("/approve")
  async approve(
    @User() user: UserT,
    @Body() body: ApproveBidRoundDto,
  ): Promise<R.ApproveRsp> {
    const { id } = body satisfies R.ApproveRqs;

    await checkAdmin(user.id);

    const approved = await this.service.approve(id);

    notifier.roundAccepted(approved);

    return approved;
  }

  @UseGuards(UserGuard)
  @Post("/disapprove")
  async disapprove(
    @User() user: UserT,
    @Body() body: DisapproveBidRoundDto,
  ): Promise<R.ApproveRsp> {
    const { id, adminMemo } = body satisfies R.DisapproveRqs;

    await checkAdmin(user.id);

    const disapproved = await this.service.disapprove(id, adminMemo);

    notifier.roundRejected(disapproved);

    return disapproved;
  }


  @UseGuards(UserGuard)
  @Patch("/:id")
  async update(
    @User() user: UserT,
    @Param("id", ParseIntPipe) id: idT,
    @Body() body: UpdateBidRoundDto,
  ): Promise<R.UpdateRsp> {
    const { form } = body satisfies R.UpdateRqs;

    const round = await this.service.get(id);
    if (!round) {
      throw new err.NotExistE();
    }
    if (round.userId !== user.id) {
      try {
        await checkAdmin(user.id);
      } catch (e) {
        throw new err.ForbiddenE("only author or admin can update");
      }
    }
    const newRound = checkBidRoundValidity({ ...round, ...form });

    const updated = this.service.update(id, newRound);

    return updated;
  }


  @Get("/:id")
  async get(
    @User() user: UserT|null,
    @Param("id", ParseIntPipe) id: idT,
    @Query() query: GetBidRoundDto,
  ): Promise<R.GetRsp> {
    const getOpt = query satisfies R.GetRqs;

    if (user) {
      getOpt.meId = user.id;
    }

    const fetched = await this.service.get(id, getOpt);
    return { data: fetched };
  }


}