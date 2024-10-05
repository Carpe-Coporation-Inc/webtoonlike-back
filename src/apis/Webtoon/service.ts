import { Injectable } from "@nestjs/common";
import { webtoonM } from "@/models/Webtoon";
import { createSignedUrl, putDevPrefix } from "@/utils/s3";
import * as mime from "mime-types";
import * as err from "@/errors";
import { listWebtoon } from "./fncs/list_webtoon";
import { lookupBuilder } from "./fncs/lookup_builder";
import { updateAggr, type WebtoonAggrOptionT } from "./fncs/update_aggr";
import type { WebtoonFormT, WebtoonT, GetWebtoonOptionT, ListWebtoonOptionT } from "@/types";

@Injectable()
export class WebtoonService {
  constructor() {}

  async updateAggr(id: idT, opt: WebtoonAggrOptionT = {}): Promise<void> {
    return await updateAggr(id, opt);
  }

  async create(form: WebtoonFormT): Promise<WebtoonT> {
    const created = await webtoonM.create(form);
    if (!created) {
      throw new err.NotAppliedE();
    }
    return created;
  }

  async get(id: idT, getOpt: GetWebtoonOptionT = {}): Promise<WebtoonT> {
    const fetched = await webtoonM.findById(id, {
      builder: (qb, select) => {
        lookupBuilder(select, getOpt);
      }
    });
    if (!fetched) {
      throw new err.NotExistE();
    }
    return fetched;
  }

  async update(id: idT, form: Partial<WebtoonFormT>): Promise<WebtoonT> {
    const updated = await webtoonM.updateOne({ id }, form);
    if (!updated) {
      throw new err.NotAppliedE();
    }
    return updated;
  }

  async list(listOpt: ListWebtoonOptionT): Promise<ListData<WebtoonT>> {
    return await listWebtoon(listOpt);
  }

  async getThumbnailPresignedUrl(mimeType: string) {
    let key = `webtoons/thumbnails/thumbnail_${new Date().getTime()}.${mime.extension(mimeType)}`;
    key = putDevPrefix(key);
    const putUrl = await createSignedUrl(key, mimeType);
    return { putUrl, key };
  }
}