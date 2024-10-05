import { Injectable } from "@nestjs/common";
import { webtoonLikeM } from "@/models/WebtoonLike";
import * as err from "@/errors";
import type { WebtoonLikeFormT, WebtoonLikeT } from "@/types";

@Injectable()
export class WebtoonLikeService {
  constructor() {}

  async get(id: idT): Promise<WebtoonLikeT> {
    const webtoonLike = await webtoonLikeM.findOne({ id });
    if (!webtoonLike) {
      throw new err.NotExistE();
    }
    return webtoonLike;
  }

  async create(form: WebtoonLikeFormT): Promise<WebtoonLikeT> {
    const created = await webtoonLikeM.upsert(form, { onConflict: ["userId", "webtoonId"] });
    if (!created) {
      throw new err.NotAppliedE();
    }
    return created;
  }

  async remove(id: idT): Promise<WebtoonLikeT> {
    const deleted = await webtoonLikeM.deleteOne({ id });
    if (!deleted) {
      throw new err.NotAppliedE();
    }
    return deleted;
  }
}