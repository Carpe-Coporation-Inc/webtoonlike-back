import { bidRoundM, BidRoundSqls } from "@/models/BidRound";
import type { GetBidRoundOptionT } from "@/types/BidRound";

export function lookupBuilder(select: any[], opt: GetBidRoundOptionT ) {
  const sqls = new BidRoundSqls(bidRoundM.table);
  if (opt.$user) {
    select.push(sqls.user());
  }
  if (opt.$webtoon) {
    select.push(sqls.webtoon());
  }
  if (opt.$requests) {
    select.push(sqls.requests());
  }
}