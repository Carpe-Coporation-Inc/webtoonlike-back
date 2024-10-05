import {
  Controller, Get, Post,
  Body, Param, Query,
  UseGuards,
} from "@nestjs/common";
import {
  CreateBidRequestMessageDto,
  ListBidRequestMessageDto,
} from "./dtos";
import { UserGuard } from "@/apis/$tools/guards";
import { User } from "@/apis/$tools/decorators";
import { BidRequestMessageService } from "./service";
import { BidRequestService } from "../BidRequest/service";
import * as err from "@/errors";
import type * as R from "@/types/BidRequestMessage.api";
import type { UserT } from "@/types";


@Controller("bid-request-messages")
export class BidRequestMessageController {
  constructor(
    private readonly service: BidRequestMessageService,
    private readonly bidRequestService: BidRequestService,
  ) {}


  @UseGuards(UserGuard)
  @Post("/")
  async create(
    @Body() body: CreateBidRequestMessageDto,
    @User() user: UserT,
  ): Promise<R.CreateRsp> {
    const { form } = body satisfies R.CreateRqs;

    if (user.id !== form.userId) {
      throw new err.ForbiddenE();
    }

    const bidRequest = await this.bidRequestService.get(form.bidRequestId, { $creator: true });

    if (!bidRequest) {
      throw new err.NotExistE("bid request not found with id " + form.bidRequestId);
    }

    // if (!(user.id == bidRequest.userId || user.id == bidRequest.creator?.id )) {
    //   throw new err.ForbiddenE("user is not allowed to create message for this bidRequest");
    // }


    const created = await this.service.create(form);
    return created;
  }

  @Get("/")
  async list(
    @Query() query: ListBidRequestMessageDto,
  ): Promise<R.ListRsp> {
    const listOpt = query satisfies R.ListRqs;

    if (!listOpt.bidRequestId) {
      throw new err.InvalidFieldE("bidRequestId should be provided");
    }

    return await this.service.list(listOpt);
  }

}