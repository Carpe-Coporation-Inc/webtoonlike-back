import { DataModel } from "@/utils/orm";
import type { BidRoundFormT, BidRoundT } from "@/types/BidRound";


const table = "bid_rounds";
export const bidRoundM = new DataModel<BidRoundFormT, BidRoundT>(table);


