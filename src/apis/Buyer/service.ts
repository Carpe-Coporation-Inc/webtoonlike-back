import { Injectable } from "@nestjs/common";
import { buyerM } from "@/models/Buyer";
import * as err from "@/errors";
import { createSignedUrl, putDevPrefix } from "@/utils/s3";
import * as mime from "mime-types";
import type { BuyerFormT, BuyerT } from "@/types/Buyer";

@Injectable()
export class BuyerService {
  constructor() {}

  async create(form: BuyerFormT ): Promise<BuyerT> {
    const created = await buyerM.upsert(form, { onConflict: ["userId"] });
    if (!created) {
      throw new err.NotAppliedE();
    }
    return created;
  }

  async _getPresinedUrl(key: string, mimeType: string) {
    key = putDevPrefix(key);
    const putUrl = await createSignedUrl(key, mimeType);
    return { putUrl, key };
  }

  async getThumbnailPresignedUrl(mimeType: string) {
    const key = `buyers/thumbnails/thumbnail_${new Date().getTime()}.${mime.extension(mimeType)}`;
    return this._getPresinedUrl(key, mimeType);
  }

  async getBusinessCertPresignedUrl(mimeType: string) {
    const key = `buyers/business_certs/thumbnail_${new Date().getTime()}.${mime.extension(mimeType)}`;
    return this._getPresinedUrl(key, mimeType);
  }

  async getBusinessCardPresignedUrl(mimeType: string) {
    const key = `buyers/business_cards/thumbnail_${new Date().getTime()}.${mime.extension(mimeType)}`;
    return this._getPresinedUrl(key, mimeType);
  }
}