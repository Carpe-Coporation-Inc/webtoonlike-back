import { bidRoundM } from "@/models/BidRound";
import { encodeCursor, decodeCursor } from "@/utils/formatter";
import * as err from "@/errors";
import { lookupBuilder } from "./lookup_builder";
import { knex } from "@/global/db";
import type { BidRoundT, ListBidRoundOptionT } from "@/types/BidRound";

export async function listBidRound(opt: ListBidRoundOptionT): Promise<ListData<BidRoundT>> {
  // const table = bidRoundM.table;
  const limit = opt.limit || 30;
  let numData: number|null = null;
  let nextCursor: string|null = null;
  let getNextCursor: (item: BidRoundT) => string|null = () => null;

  const fetched = await bidRoundM.find({
    builder: (qb, select) => {
      qb.limit(limit);

      qb.orderBy("createdAt", "desc");

      if (opt.offset) {
        qb.offset(opt.offset);
      }

      // count all data fetched
      if (opt.$numData) {
        select.push(knex.raw("count(*) OVER() AS \"numData\""));
      }
      getNextCursor = (item) => encodeCursor({ createdAt: item.createdAt });

      if (opt.cursor) {
        const cursor = decodeCursor(opt.cursor);
        qb.where("createdAt", "<", cursor.createdAt);
      }

      if (opt.userId) {
        qb.where("userId", opt.userId);
      }

      // webtoonId
      if (opt.webtoonId) {
        qb.where("webtoonId", opt.webtoonId);
      }

      // approved
      if (opt.approval) {
        switch (opt.approval) {
        case "approvedOnly":
          qb.whereNotNull("approvedAt");
          break;
        case "disapprovedOnly":
          qb.whereNotNull("disapprovedAt");
          break;
        case "waitingApproval":
          qb.whereNull("approvedAt").whereNull("disapprovedAt");
          break;
        case "exceptApproved":
          qb.whereNull("approvedAt");
          break;
        case "exceptDisapproved":
          qb.whereNull("disapprovedAt");
          break;
        default:
          throw new err.InvalidDataE("invalid approved option:" + opt.approval);
        }
      }

      // status
      if (opt.status) {
        const statusArray = opt.status.split(",").map((s) => s.trim());
        qb.whereIn("status", statusArray );

      }

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

  return {
    data: fetched,
    nextCursor,
    numData,
  };

}