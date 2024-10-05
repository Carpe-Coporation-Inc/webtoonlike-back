import { DataModel } from "@/utils/orm";
import type { BidRequestFormT, BidRequestT } from "@/types/BidRequest";


const table = "bid_requests";
export const bidRequestM = new DataModel<BidRequestFormT, BidRequestT>(table);


