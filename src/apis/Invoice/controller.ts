import {
  Controller, Post, Get,
  Body, Param, Query,
  ParseIntPipe,
} from "@nestjs/common";
import {
  ListInvoiceDto,
} from "./dtos";
import type * as R from "@/types/Invoice.api";
import { InvoiceService } from "./service";


@Controller("invoices")
export class InvoiceController {
  constructor(private readonly service: InvoiceService) {}

  @Get("/")
  async list(
    @Query() query: ListInvoiceDto,
  ): Promise<R.ListRsp> {
    const listOpt = query satisfies R.ListRqs;
    return await this.service.list(listOpt);
  }

}