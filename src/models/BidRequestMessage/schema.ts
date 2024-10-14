import { z } from "zod";
import { baseModelSchema, insertFormSchema, getOptionSchema, listOptionSchema } from "../$commons/schema";
import { TG } from "@/utils/type_generator";


export const bidRequestMessageFormSchema = insertFormSchema.extend({
  bidRequestId: z.number(),
  content: z.string(),
});

export const bidRequestMessageSchema = baseModelSchema.extend(bidRequestMessageFormSchema.shape);

export const getBidRequestMessageOptionSchema = getOptionSchema.extend({
  // $creator: z.coerce.boolean(),
  // $buyer: z.coerce.boolean(),
}).partial();
export const listBidRequestMessageOptionSchema = listOptionSchema.extend({
  ...getBidRequestMessageOptionSchema.shape,
  bidRequestId: z.coerce.number().int(),
}).partial();


const tgKey = "BidRequestMessage";


TG.add(tgKey, "BidRequestMessageFormT", bidRequestMessageFormSchema);
TG.add(tgKey, "BidRequestMessageT", bidRequestMessageSchema);

TG.add(tgKey, "GetBidRequestMessageOptionT", getBidRequestMessageOptionSchema);
TG.add(tgKey, "ListBidRequestMessageOptionT", listBidRequestMessageOptionSchema);

