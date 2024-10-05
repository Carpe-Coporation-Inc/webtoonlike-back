import { webtoonM } from "@/models/Webtoon";
import { encodeCursor, decodeCursor } from "@/utils/formatter";
import { lookupBuilder } from "./lookup_builder";
import * as err from "@/errors";
import { knex } from "@/global/db";
import type { WebtoonT, ListWebtoonOptionT } from "@/types/Webtoon";

export async function listWebtoon(opt: ListWebtoonOptionT): Promise<ListData<WebtoonT>> {
  const table = webtoonM.table;
  const limit = opt.limit ?? 30;
  let numData: number|null = null;
  let nextCursor: string|null = null;
  let getNextCursor: (item: WebtoonT) => string|null = () => null;

  const fetched = await webtoonM.find({
    builder: (qb, select) => {
      qb.limit(limit);

      if (opt.offset) {
        qb.offset(opt.offset);
      }

      // count all data fetched
      if (opt.$numData) {
        select.push(knex.raw("count(*) OVER() AS \"numData\""));
      }

      // sort
      switch (opt.sort ?? "recent") {
      case "recent":
        qb.orderByRaw(`"${table}"."createdAt" DESC`);
        getNextCursor = (item) => encodeCursor({ createdAt: item.createdAt });
        if (opt.cursor) {
          const cursor = decodeCursor(opt.cursor);
          qb.where(`${table}.createdAt`, "<", cursor.createdAt);
        }
        break;
      case "old":
        qb.orderByRaw(`"${table}"."createdAt" ASC`);
        getNextCursor = (item) => encodeCursor({ createdAt: item.createdAt });
        if (opt.cursor) {
          const cursor = decodeCursor(opt.cursor);
          qb.where(`${table}.createdAt`, ">", cursor.createdAt);
        }
        break;
      case "popular":
        qb.orderByRaw(`"${table}"."numLike" desc, "${table}"."createdAt" desc`);
        getNextCursor = (item) => encodeCursor({
          numLike: item.numLike,
          createdAt: item.createdAt,
        });
        if (opt.cursor) {
          const cursor = decodeCursor(opt.cursor);
          qb.whereRaw(`"${table}"."numLike" < ${cursor.numLike}`).orWhere(function(this) {
            this.whereRaw(`"${table}"."numLike" = ${cursor.numLike} and "${table}"."createdAt" < ${cursor.createdAt}`);
          });
        }
        break;
      default:
        throw new err.InvalidDataE(`sort given ${opt.sort}, must be 'recent', 'old', or 'popular'`);
      }


      // authorId
      if (opt.authorId) {
        qb.where("authorId", opt.authorId);
      }

      // mine
      if (opt.mine && opt.meId) {
        switch (opt.mine) {
        case "only":
          qb.where("authorId", opt.meId);
          break;
        case "except":
          qb.where("authorId", "!=", opt.meId);
          break;
        default:
          throw new err.InvalidDataE("mine must be 'only' or 'except'");
        }
      }

      if (opt.like && opt.meId) {
        switch (opt.like) {
        case "only":
          qb.leftJoin("webtoon_likes AS wl", function(this) {
            this.on("wl.webtoonId", `${table}.id`).andOn("wl.userId", opt.meId as any);
          });
          qb.whereNotNull("wl.id");
          break;
        case "except":
          qb.leftJoin("webtoon_likes AS wl", function(this) {
            this.on("wl.webtoonId", `${table}.id`).andOn("wl.userId", opt.meId as any);
          });
          qb.whereNull("wl.id");
          break;
        default:
          throw new err.InvalidDataE("like must be 'only' or 'except'");
        }
      }

      // bidStatus
      if (opt.bidStatus) {
        qb.innerJoin("bid_rounds", "bid_rounds.webtoonId", `${table}.id`);
        const statusArray = opt.bidStatus.split(",").map((s) => s.trim());
        qb.whereIn("bid_rounds.status", statusArray );
      }

      if (opt.ageLimit) {
        qb.where("ageLimit", opt.ageLimit);
      }

      // genre
      if (opt.genreId) {
        qb.innerJoin("x_webtoon_genres AS xwg", function(this) {
          this.on("xwg.webtoonId", `${table}.id`).andOn("xwg.genreId", opt.genreId as any);
        });
      }

      // subqueries
      lookupBuilder(select, opt);
    }
  });

  if (fetched.length >= limit) {
    const lastItem = fetched[fetched.length - 1];
    nextCursor = getNextCursor(lastItem);
  }

  if (opt.$numData && fetched.length > 0) {
    numData = (fetched[0] as any).numData;
  }


  return { data: fetched, nextCursor, numData };
}