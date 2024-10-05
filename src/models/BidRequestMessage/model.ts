import { DataModel } from "@/utils/orm";
import type { BidRequestMessageFormT, BidRequestMessageT } from "@/types/BidRequestMessage";


const table = "bid_request_messages";
export const bidRequestMessageM = new DataModel<BidRequestMessageFormT, BidRequestMessageT>(table);

