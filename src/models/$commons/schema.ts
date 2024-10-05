import { z } from "zod";
import { TG } from "@/utils/type_generator";


const tgKey = "$commons";


// bid shared scheam
// http://www.lingoes.net/en/translator/langcode.htm
export const countryEnum = z.enum(["all", "ko", "en", "zhCN", "zhTW", "de", "id", "ja", "fr", "vi", "ms", "th", "es",]);
export const businessFieldEnum = z.enum(["all", "webtoon", "movie", "drama", "webDrama", "ads", "musical", "game", "book", "product"]);
export const contractEnum = z.enum(["exclusive", "nonExclusive", "disallow"]);


export const insertFormSchema = z.object({});
TG.add(tgKey, "InsertFormT", insertFormSchema);

export const baseModelSchema = z.object({
  id: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
});
TG.add(tgKey, "BaseModelT", baseModelSchema);

export const getOptionSchema = z.object({
  meId: z.coerce.number().int(),
}).partial();
TG.add(tgKey, "GetOptionT", getOptionSchema);

export const listOptionSchema = z.object({
  cursor: z.string(),
  limit: z.coerce.number().int(),
  offset: z.coerce.number().int(),
  $numData: z.coerce.boolean(),
});
