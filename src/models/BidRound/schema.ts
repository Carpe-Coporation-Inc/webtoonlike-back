import { z } from "zod";
import { baseModelSchema, insertFormSchema, getOptionSchema, listOptionSchema } from "../$commons/schema";
import { TG } from "@/utils/type_generator";
import { contractEnum, countryEnum, businessFieldEnum } from "../$commons/schema";


export const bidStatusEnum = z.enum(["idle", "waiting", "bidding", "negotiating", "done"]); // idle = watingApproval

const originalityEnum = z.enum(["original", "notOriginal"]);

const bidContractRangeSchema = z.object({
  contract: contractEnum,
  businessField: businessFieldEnum,
  country: countryEnum,
});


// bid_round
const bidRoundFormZ = {
  userId: z.number().int().nullable(),
  webtoonId: z.number().int(),

  isWebtoon: z.boolean().nullish(),
  isSecondary: z.boolean().nullish(),
  contractRange: z.object({
    data: bidContractRangeSchema.array(),
  }),
  originality: originalityEnum,
  isBrandNew: z.boolean(),
  numEpisode: z.number().int().nullish(),
  nowEpisode: z.number().int().nullish(),
  monthlyNumEpisode: z.number().int().nullish(),

  status: bidStatusEnum,
  bidStartAt: z.coerce.date().nullish(),
  negoStartAt: z.coerce.date().nullish(),
  processEndAt: z.coerce.date().nullish(),

  approvedAt: z.coerce.date().nullish(),
  disapprovedAt: z.coerce.date().nullish(),
  adminMemo: z.string().nullish(),
};

export const bidRoundFormSchema = insertFormSchema.extend(bidRoundFormZ);
export const bidRoundSchema = baseModelSchema.extend(bidRoundFormZ);

export const getBidRoundOptionSchema = getOptionSchema.extend({
  $webtoon: z.coerce.boolean(),
  $user: z.coerce.boolean(),
  $requests: z.coerce.boolean(),
}).partial();
export const listBidRoundOptionSchema = listOptionSchema.extend({
  ...getBidRoundOptionSchema.shape,
  userId: z.coerce.number().int(),
  webtoonId: z.coerce.number().int(),
  // status: bidStatusEnum,
  status: bidStatusEnum.or(z.string()).describe("pass comma separated string for array of status"),
  approval: z.enum(["approvedOnly", "disapprovedOnly", "waitingApproval", "exceptApproved", "exceptDisapproved"]),
}).partial();


const tgKey = "BidRound";

TG.add(tgKey, "BidRoundFormT", bidRoundFormSchema);
TG.add(tgKey, "_BidRoundT", bidRoundSchema, { private: true });

TG.add(tgKey, "GetBidRoundOptionT", getBidRoundOptionSchema);
TG.add(tgKey, "ListBidRoundOptionT", listBidRoundOptionSchema);


