import { z } from "zod";
import { baseModelSchema, insertFormSchema, getOptionSchema, listOptionSchema } from "../$commons/schema";
import { businessFieldEnum, contractEnum, countryEnum } from "../$commons/schema";
import { TG } from "@/utils/type_generator";


const contractRangeSchema = z.object({
  contract: contractEnum,
  businessField: businessFieldEnum,
  country: countryEnum,
  message: z.string(),
});

const bidRequestFormZ = {
  userId: z.number().int().nullable(),
  roundId: z.number().int(),
  message: z.string().nullish(),

  contractRange: z.object({
    data: contractRangeSchema.array(),
  }),
  acceptedAt: z.coerce.date().nullish().describe("creator acceptance"),
  rejectedAt: z.coerce.date().nullish().describe("creator rejection"),

  approvedAt: z.coerce.date().nullish().describe("admin approval"),
  cancelledAt: z.coerce.date().nullish().describe("user cancel bid request"),
};

export const bidRequestFormSchema = insertFormSchema.extend(bidRequestFormZ);
export const bidRequestSchema = baseModelSchema.extend(bidRequestFormZ);

export const getBidRequestOptionSchema = getOptionSchema.extend({
  $round: z.coerce.boolean(),
  $webtoon: z.coerce.boolean(),
  $buyer: z.coerce.boolean(),
  $creator: z.coerce.boolean(),
  $invoice: z.coerce.boolean(),
}).partial();
export const listBidRequestOptionSchema = listOptionSchema.extend({
  ...getBidRequestOptionSchema.shape,
  userId: z.coerce.number().int(),
  roundId: z.coerce.number().int(),
  status: z.enum(["accepted", "rejected"]),
  approved: z.enum(["only", "except"]),
  mine: z.enum(["only", "except"]),
}).partial();


const tgKey = "BidRequest";

TG.add(tgKey, "BidRequestFormT", bidRequestFormSchema);
TG.add(tgKey, "_BidRequestT", bidRequestSchema, { private: true });

TG.add(tgKey, "GetBidRequestOptionT", getBidRequestOptionSchema);
TG.add(tgKey, "ListBidRequestOptionT", listBidRequestOptionSchema);

