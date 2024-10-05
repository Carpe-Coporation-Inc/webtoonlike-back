import { bidRequestM } from "@/models/BidRequest";
import { encodeCursor, decodeCursor } from "@/utils/formatter";
import { lookupBuilder } from "./lookup_builder";
import { knex } from "@/global/db";
import type { BidRequestT, ListBidRequestOptionT } from "@/types/BidRequest";

export async function listBidRequest(opt: ListBidRequestOptionT): Promise<ListData<BidRequestT>> {
  // const table = bidRequestM.table;
  const limit = opt.limit ?? 30;
  let numData: number|null = null;
  let nextCursor: string|null = null;
  let getNextCursor: (item: BidRequestT) => string|null = () => null;

  const fetched = await bidRequestM.find({
    builder: (qb, select) => {
      qb.limit(limit);

      if (opt.offset) {
        qb.offset(opt.offset);
      }

      // count all data fetched
      if (opt.$numData) {
        select.push(knex.raw("count(*) OVER() AS \"numData\""));
      }

      qb.orderBy("createdAt", "desc");
      getNextCursor = (item) => encodeCursor({ createdAt: item.createdAt });

      // curosr
      if (opt.cursor) {
        const cursor = decodeCursor(opt.cursor);
        qb.where("createdAt", "<", cursor.createdAt);
      }


      // status
      if (opt.status) {
        switch (opt.status) {
        case "accepted":
          qb.whereNotNull("acceptedAt");
          break;
        case "rejected":
          qb.whereNotNull("rejectedAt");
          break;
        default:
          throw new Error("invalid status option:" + opt.status);
        }
      }

      // userId
      if (opt.userId) {
        qb.where("userId", opt.userId);
      }

      // mine
      if (opt.mine && opt.meId) {
        switch (opt.mine) {
        case "only":
          qb.where("userId", opt.meId);
          break;
        case "except":
          qb.whereNot("userId", opt.userId);
          break;
        default:
          throw new Error("invalid mine option:" + opt.mine);
        }
      }

      // roundId
      if (opt.roundId) {
        qb.where("roundId", opt.roundId);
      }

      // approved
      if (opt.approved) {
        switch (opt.approved) {
        case "only":
          qb.whereNotNull("approvedAt");
          break;
        case "except":
          qb.whereNull("approvedAt");
          break;
        default:
          throw new Error("invalid approved option:" + opt.approved);
        }
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

  return {
    data: fetched,
    nextCursor,
    numData,
  };

}