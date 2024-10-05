import { DataModel } from "@/utils/orm";
import type { BuyerFormT, BuyerT } from "@/types/Buyer";


const table = "buyers";
export const buyerM = new DataModel<BuyerFormT, BuyerT>(table);


