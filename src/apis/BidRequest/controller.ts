import {
  Controller, Post, Get, Patch, Delete,
  Body, Param, Query,
  UseGuards, ParseIntPipe,
} from "@nestjs/common";
import { User } from "@/apis/$tools/decorators";
import { UserGuard, checkAdmin } from "@/apis/$tools/guards";
import { BidRequestService } from "./service";
import { InvoiceService } from "@/apis/Invoice/service";
import {
  CreateBidRequestDto,
  ListBidRequestDto,
  GetBidRquestDto,
  UpdateBidRequestDto,
  AcceptBidRequestDto,
  RejectBidRequestDto,
  CancelBidRequestDto,
  PublishInvoiceDto,
  ConfirmInvoiceDto,
} from "./dtos";
import { createInvoiceImage } from "@/utils/invoice";
import { notifier } from "@/apis/$runners/notifier";
import * as err from "@/errors";
import type * as R from "@/types/BidRequest.api";
import type { InvoiceFormT, UserT } from "@/types";

import { userM } from "@/models/User";

@Controller("bid-requests")
export class BidRequestController {
  constructor(
    private readonly service: BidRequestService,
    private readonly invoiceService: InvoiceService,
  ) {}


  @Get("/")
  async list(
    @User() user: UserT|null,
    @Query() query: ListBidRequestDto,
  ): Promise<R.ListRsp> {
    const listOpt = query satisfies R.ListRqs;
    if (user) {
      listOpt.meId = user.id;
    }
    const { data, nextCursor } = await this.service.list(listOpt);
    return { data, nextCursor };
  }

  @UseGuards(UserGuard)
  @Post("/")
  async create(
    @Body() body: CreateBidRequestDto,
    @User() user: UserT,
  ): Promise<R.CreateRsp> {
    const { form } = body satisfies R.CreateRqs;

    if (form.userId !== user.id) {
      throw new err.InvalidDataE("form.userId not matching");
    }

    const created = this.service.create(form);

    return created;
  }

  @Get("/:id")
  async get(
    @Param("id", ParseIntPipe) id: idT,
    @Query() query: GetBidRquestDto,
  ): Promise<R.GetRsp> {
    const getOpt = query satisfies R.GetRqs;
    const item = await this.service.get(id, getOpt);
    return { data: item };
  }

  @UseGuards(UserGuard)
  @Patch("/:id")
  async update(
    @User() user: UserT,
    @Body() body: UpdateBidRequestDto,
    @Param("id", ParseIntPipe) id: idT,
  ): Promise<R.UpdateRsp> {
    const { form } = body satisfies R.UpdateRqs;

    const item = await this.service.get(id);
    if (item.userId !== user.id) {
      throw new err.ForbiddenE("only owner can update");
    }

    const updated = await this.service.update(id, form);
    return updated;
  }

  @UseGuards(UserGuard)
  @Delete("/:id")
  async remove(
    @Param("id", ParseIntPipe) id: idT,
    @User() user: UserT,
  ): Promise<R.DeleteRsp> {
    const item = await this.service.get(id);
    if (item.userId !== user.id) {
      throw new err.ForbiddenE("only owner can delete");
    }
    const deleted = await this.service.remove(id);

    return deleted;
  }

  @UseGuards(UserGuard)
  @Post("/accept")
  async accept(
    @User() user: UserT,
    @Body() body: AcceptBidRequestDto,
  ): Promise<R.AcceptRsp> {
    const { id } = body satisfies R.AcceptRqs;

    const item = await this.service.get(id, { $webtoon: true });

    if (item.webtoon!.authorId != user.id) {
      throw new err.ForbiddenE("only webtoon owner can accept");
    }

    if (item.cancelledAt) {
      throw new err.InvalidActionE("request already cancelled");
    }

    // const invoiceForm: InvoiceFormT = {
    //   requestId: item.id,
    //   creatorUid: item.webtoon!.authorId,
    //   buyerUid: item.userId,
    // };
    // const invoiceCreated = await this.invoiceService.create(invoiceForm);
    // console.log(invoiceCreated);

    const accepted = await this.service.accept(id);

    notifier.requestAccepted(accepted);

    return accepted;
  }

  @UseGuards(UserGuard)
  @Post("/reject")
  async reject(
    @User() user: UserT,
    @Body() body: RejectBidRequestDto,
  ): Promise<R.RejectRsp> {
    const { id } = body satisfies R.RejectRqs;

    const item = await this.service.get(id, { $webtoon: true });

    if (item.webtoon!.authorId != user.id) {
      throw new err.ForbiddenE("only webtoon owner can reject");
    }

    if (item.cancelledAt) {
      throw new err.InvalidActionE("request already cancelled");
    }

    const rejected = await this.service.reject(id);

    notifier.requestRejected(rejected);

    return rejected;
  }

  @UseGuards(UserGuard)
  @Post("/cancel")
  async cancel(
    @User() user: UserT,
    @Body() body: CancelBidRequestDto,
  ): Promise<R.CancelRsp> {
    const { id } = body satisfies R.CancelRqs;

    const item = await this.service.get(id);

    if (item.userId !== user.id) {
      throw new err.ForbiddenE("only owner can cancel");
    }

    if (item.acceptedAt) {
      throw new err.InvalidActionE("request already accepted");
    }
    if (item.rejectedAt) {
      throw new err.InvalidActionE("request already rejected");
    }

    const cancelled = await this.service.cancel(id);

    return cancelled;
  }


  @UseGuards(UserGuard)
  @Post("/publish-invoice")
  async publishInvoice(
    @User() user: UserT,
    @Body() body: PublishInvoiceDto,
  ): Promise<R.PublishInvoiceRsp> {
    const { requestId } = body satisfies R.PublishInvoiceRqs;

    await checkAdmin(user.id);

    const request = await this.service.get(requestId, {
      $webtoon: true,
      $buyer: true,
      $creator: true,
    });

    if (request.buyer == null) {
      throw new err.NotExistE("buyer not exist");
    }
    const buyerUser = await userM.findById(request.buyer.userId);
    request.buyer.user = buyerUser ?? undefined;
    if (request.creator == null) {
      throw new err.NotExistE("creator not exist");
    }
    const creatorUser = await userM.findById(request.creator.userId);
    request.creator.user = creatorUser ?? undefined;

    const buff = await createInvoiceImage(request);
    const base64 = buff.toString("base64");
    const dataURI = `data:application/pdf;base64,${base64}`;
    // console.log(dataURI);
    return { base64data: dataURI };

  }

  @UseGuards(UserGuard)
  @Post("/confirm-invoice")
  async confirmInvoice(
    @User() user: UserT,
    @Body() body: ConfirmInvoiceDto,
  ): Promise<R.ConfirmInvoiceRsp> {
    const { requestId, base64data } = body satisfies R.ConfirmInvoiceRqs;

    await checkAdmin(user.id);

    if (!base64data.startsWith("data:application/pdf;base64,")) {
      throw new err.InvalidDataE("base64data should starts with data:application/pdf;base64,");
    }

    const request = await this.service.get(requestId, {
      $webtoon: true,
      $buyer: true,
      $creator: true,
    });

    if (request.buyer == null) {
      throw new err.NotExistE("buyer not exist");
    }
    const buyerUser = await userM.findById(request.buyer.userId);
    request.buyer.user = buyerUser ?? undefined;
    if (request.creator == null) {
      throw new err.NotExistE("creator not exist");
    }
    const creatorUser = await userM.findById(request.creator.userId);
    request.creator.user = creatorUser ?? undefined;


    notifier.invoicePublished(request);

    const invoiceForm: InvoiceFormT = {
      requestId: request.id,
      creatorUid: request.creator!.userId,
      buyerUid: request.buyer!.userId,
      dataUri: base64data,
    };
    const invoiceCreated = await this.invoiceService.create(invoiceForm);
    await this.service.approve(request.id);

    return invoiceCreated;
  }
}