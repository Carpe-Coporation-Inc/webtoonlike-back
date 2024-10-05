import {
  Controller, Post,
  Body, Param, Query,
  UseGuards,
} from "@nestjs/common";
import { UserGuard } from "@/apis/$tools/guards";
import {
  CreateBuyerDto,
  GetThumbnailPresignedUrlDto,
  GetBusinessCertPresignedUrlDto,
  GetBusinessCardPresignedUrlDto,
} from "./dtos";
import { BuyerService } from "./service";
import type * as R from "@/types/Buyer.api";


@Controller("buyers")
export class BuyerController {
  constructor(private readonly service: BuyerService) {}

  @Post("/")
  async create(
    @Body() body: CreateBuyerDto
  ) {
    const { form } = body satisfies R.CreateRqs;
    const created = await this.service.create(form);
    return created;
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

  @UseGuards(UserGuard)
  @Post("/business-cert/presigned-url")
  async getBusinessCertPresignedUrl(
    @Body() body: GetBusinessCertPresignedUrlDto,
  ): Promise<R.BusinessCertPresignedUrlRsp> {
    const { mimeType } = body satisfies R.BusinessCertPresignedUrlRqs;
    const { putUrl, key } = await this.service.getBusinessCertPresignedUrl(mimeType);
    return { putUrl, key };
  }

  @UseGuards(UserGuard)
  @Post("/business-card/presigned-url")
  async getBusinessCardPresignedUrl(
    @Body() body: GetBusinessCardPresignedUrlDto,
  ): Promise<R.BusinessCaardPresignedUrlRsp> {
    const { mimeType } = body satisfies R.BusinessCardPresignedUrlRqs;
    const { putUrl, key } = await this.service.getBusinessCardPresignedUrl(mimeType);
    return { putUrl, key };
  }

}