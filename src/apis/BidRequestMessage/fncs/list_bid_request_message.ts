

import { bidRequestMessageM } from "@/models/BidRequestMessage";
import { encodeCursor, decodeCursor } from "@/utils/formatter";
import { lookupBuilder } from "./lookup_builder";
import { knex } from "@/global/db";
import type { BidRequestMessageT, ListBidRequestMessageOptionT } from "@/types/BidRequestMessage";

export async function listBidRequestMessage(opt: ListBidRequestMessageOptionT): Promise<ListData<BidRequestMessageT>> {
  const table = bidRequestMessageM.table;
  const limit = opt.limit ?? 30;
  let nextCursor: string|null = null;
  let getNextCursor: (item: BidRequestMessageT) => string|null = () => null;

  const fetched = await bidRequestMessageM.find({
    builder: (qb, select) => {
      qb.limit(limit);

      qb.orderBy("createdAt", "desc");
      getNextCursor = (item) => encodeCursor({ createdAt: item.createdAt });

      // curosr
      if (opt.cursor) {
        const cursor = decodeCursor(opt.cursor);
        qb.where("createdAt", "<", cursor.createdAt);
      }

      // roundId
      if (opt.bidRequestId) {
        qb.where("bidRequestId", opt.bidRequestId);
      }

      // subqueries
      lookupBuilder(select, opt);
    }
  });

  if (fetched.length >= limit) {
    const lastItem = fetched[fetched.length - 1];
    nextCursor = getNextCursor(lastItem);
  }


  return {
    data: fetched,
    nextCursor,
  };

}