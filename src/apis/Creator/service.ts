import { Injectable } from "@nestjs/common";
import { creatorM } from "@/models/Creator";
import * as err from "@/errors";
import { createSignedUrl, putDevPrefix } from "@/utils/s3";
import * as mime from "mime-types";
import { listCreator } from "./fncs/list_creator";
import { lookupBuilder } from "./fncs/lookup_builder";
import type { CreatorFormT, CreatorT, GetCreatorOptionT, ListCreatorOptionT } from "@/types/Creator";

@Injectable()
export class CreatorService {
  constructor() {}

  async get(id: idT, getOpt: GetCreatorOptionT = {}): Promise<CreatorT> {
    return creatorM.findById(id, {
      builder: (qb,select) => {
        lookupBuilder(select, getOpt);
      }
    });
  }

  async create(form: CreatorFormT): Promise<CreatorT> {
    const created = await creatorM.upsert(form, { onConflict: ["userId"] });
    if (!created) {
      throw new err.NotAppliedE();
    }
    return created;
  }

  async update(id: idT, form: Partial<CreatorFormT>): Promise<CreatorT> {
    const updated = await creatorM.updateOne({ id }, form);
    if (!updated) {
      throw new err.NotAppliedE();
    }
    return updated;
  }

  async list(listOpt: ListCreatorOptionT): Promise<ListData<CreatorT>> {
    return await listCreator(listOpt);
  }

  async getThumbnailPresignedUrl(mimeType: string) {
    let key = `creators/thumbnails/thumbnail_${new Date().getTime()}.${mime.extension(mimeType)}`;
    key = putDevPrefix(key);
    const putUrl = await createSignedUrl(key, mimeType);
    return { putUrl, key };
  }
}