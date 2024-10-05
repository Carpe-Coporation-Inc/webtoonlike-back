import type { GetBidRequestMessageOptionT } from "@/types/BidRequestMessage";
import { bidRequestM, BidRequestSqls } from "@/models/BidRequest";

export function lookupBuilder(select: any[], opt: GetBidRequestMessageOptionT): void {
  const sqls = new BidRequestSqls(bidRequestM.table);

}