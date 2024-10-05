import { webtoonM } from "@/models/Webtoon";
import * as err from "@/errors";
import { knex } from "@/global/db";

export type WebtoonAggrOptionT = {
  numLike?: boolean
}

export async function updateAggr(id: idT, opt: WebtoonAggrOptionT): Promise<void> {
  if (opt.numLike) {
    const rsp = await knex("webtoon_likes").count("id")
      .where("webtoonId", id)
      .first();
    if (!rsp) {
      throw new err.NotAppliedE();
    }
    const { count: numLike } = rsp;
    await webtoonM.updateOne({ id }, { numLike: numLike as number });
  }
}