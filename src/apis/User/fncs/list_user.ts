import { userM } from "@/models/User";
import { decodeCursor, encodeCursor } from "@/utils/formatter";
import { knex } from "@/global/db";
import type { UserT, ListUserOptionT } from "@/types";

export async function listUser(opt: ListUserOptionT) {
  // const table = userM.table;
  const limit = opt.limit ?? 30;
  let numData: number|null = null;
  let nextCursor: string|null = null;
  let getNextCursor: (item: UserT) => string|null = () => null;

  const fetched = await userM.find({
    builder: (qb, select) => {
      qb.limit(limit);

      if (opt.offset) {
        qb.offset(opt.offset);
      }

      // sort
      qb.orderBy("createdAt", "desc");

      // count all data fetched
      if (opt.$numData) {
        select.push(knex.raw("count(*) OVER() AS \"numData\""));
      }


      getNextCursor = (item) => encodeCursor({ createdAt: item.createdAt });
      if (opt.cursor) {
        const cursor = decodeCursor(opt.cursor);
        qb.where("createdAt", "<", cursor.createdAt);
      }

      if (opt.userType) {
        qb.where("userType", opt.userType);
      }
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