import type { GetBidRequestOptionT } from "@/types/BidRequest";
import { bidRequestM, BidRequestSqls } from "@/models/BidRequest";

export function lookupBuilder(select: any[], opt: GetBidRequestOptionT): void {
  const sqls = new BidRequestSqls(bidRequestM.table);

  if (opt.$round) {
    select.push(sqls.round());
  }
  if (opt.$webtoon) {
    select.push(sqls.webtoon());
  }
  if (opt.$buyer) {
    select.push(sqls.buyer());
  }
  if (opt.$creator) {
    select.push(sqls.creator());
  }
  if (opt.$invoice) {
    select.push(sqls.invoice());
  }

}