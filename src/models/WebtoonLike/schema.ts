import { z } from "zod";
import { baseModelSchema, insertFormSchema } from "../$commons/schema";
import { TG } from "@/utils/type_generator";


const webtoonLikeFormZ = {
  userId: z.number().int().positive().nullable(),
  webtoonId: z.number().int().positive(),
};

export const webtoonLikeFormSchema = insertFormSchema.extend(webtoonLikeFormZ);
export const webtoonLikeSchema = baseModelSchema.extend(webtoonLikeFormZ);

// export const get_OptionSchema = getOptionSchema.extend({});
// export const list_OptionSchema = get_OptionSchema.extend({});


const tgKey = "WebtoonLike";

TG.add(tgKey, "WebtoonLikeFormT", webtoonLikeFormSchema);
TG.add(tgKey, "WebtoonLikeT", webtoonLikeSchema);
