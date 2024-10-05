import { z } from "zod";
import { baseModelSchema, insertFormSchema, getOptionSchema } from "../$commons/schema";
import { TG } from "@/utils/type_generator";


const companyFieldTypeEnum = z.enum(["webtoon", "game", "movie", "drama", "webDrama", "video", "book", "performance", "etc" ]);
const companyBusinessTypeEnum = z.enum(["creator", "investor", "agent", "platform", "ott", "management", "etc"]);
const buyerPurposeEnum = z.enum(["privateContract", "publicContract", "publish", "secondaryProperty", "investment"]);

export const buyerFormSchema = insertFormSchema.extend({
  userId: z.number().int(),
  name: z.string(),

  companyInfo: z.object({
    name: z.string(),
    thumbPath: z.string().describe("대표이미지"),
    fieldType: companyFieldTypeEnum.array().describe("업체분야"),
    businessType: companyBusinessTypeEnum.array().describe("직종/업종"),
    dept: z.string().nullish().describe("부서"),
    position: z.string().nullish().describe("직책"),
    positionDetail: z.string().nullish().describe("담당 업무 입력"),
    businessNumber: z.string().describe("사업자등록번호"),
    businessCertPath: z.string().describe("사업자등록증 파일 경로"),
    businessCardPath: z.string().describe("명함 파일 경로"),
  }),
  purpose: buyerPurposeEnum.nullish(),
});
export const buyerSchema = baseModelSchema.extend(buyerFormSchema.shape);

export const getBuyerOptionSchema = getOptionSchema.extend({});
export const listBuyerOptionSchema = getBuyerOptionSchema.extend({});


const tgKey = "Buyer";

TG.add(tgKey, "BuyerFormT", buyerFormSchema);
TG.add(tgKey, "_BuyerT", buyerSchema, { private: true });

TG.add(tgKey, "GetBuyerOptionT", getBuyerOptionSchema);
TG.add(tgKey, "ListBuyerOptionT", listBuyerOptionSchema);

