import { userM, UserSqls } from "@/models/User";
import type { GetUserOptionT } from "@/types/User";

export function lookupBuilder(select: any[], opt: GetUserOptionT) {
  const sqls = new UserSqls(userM.table);

  if (opt.$creator) {
    select.push(sqls.creator());
  }

  if (opt.$buyer) {
    select.push(sqls.buyer());
  }
}