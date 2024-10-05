import { z } from "zod";
import { baseModelSchema, insertFormSchema, getOptionSchema } from "../$commons/schema";
import { TG } from "@/utils/type_generator";


const webtoonEpisodeFormZ = {
  authorId: z.number().int().nullable(),
  webtoonId: z.number().int(),
  episodeNo: z.number().int(),
  title: z.string().nullish(),
  title_en: z.string().nullish(),
  description: z.string().nullish(),
  thumbPath: z.string().nullish(),
  englishUrl: z.string().nullish(),
  modifiedAt: z.date().nullish(),
  publishedAt: z.date().nullish(),
};

export const webtoonEpisodeFormSchema = insertFormSchema.extend(webtoonEpisodeFormZ);
export const webtoonEpisodeSchema = baseModelSchema.extend(webtoonEpisodeFormZ);

export const getWebtoonEpisodeOptionSchema = getOptionSchema.extend({
  $images: z.coerce.boolean(),
}).partial();
export const listWebtoonEpisodeOptionSchema = getWebtoonEpisodeOptionSchema.extend({
  limit: z.coerce.number().int(),
  cursor: z.string(),
  webtoonId: z.coerce.number().int(),
}).partial();


const tgKey = "WebtoonEpisode";

TG.add(tgKey, "WebtoonEpisodeFormT", webtoonEpisodeFormSchema);
TG.add(tgKey, "_WebtoonEpisodeT", webtoonEpisodeSchema, { private: true });

TG.add(tgKey, "GetWebtoonEpisodeOptionT", getWebtoonEpisodeOptionSchema);
TG.add(tgKey, "ListWebtoonEpisodeOptionT", listWebtoonEpisodeOptionSchema);

