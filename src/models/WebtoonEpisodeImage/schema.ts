import { z } from "zod";
import { baseModelSchema, insertFormSchema, getOptionSchema } from "../$commons/schema";
import { TG } from "@/utils/type_generator";


const webtoonEpisodeImageFormZ = {
  episodeId: z.number().int(),
  host: z.string().nullish(),
  path: z.string(),
  mimeType: z.string(),
  width: z.number().int().nullish(),
  height: z.number().int().nullish(),
  rank: z.number().int().nullish(),
};

export const webtoonEpisodeImageFormSchema = insertFormSchema.extend(webtoonEpisodeImageFormZ);
export const webtoonEpisodeImageSchema = baseModelSchema.extend(webtoonEpisodeImageFormZ);

export const getWebtoonEpisodeImageOptionSchema = getOptionSchema.extend({});
export const listWebtoonEpisodeImageOptionSchema = getWebtoonEpisodeImageOptionSchema.extend({
  episodeId: z.number().int(),
}).partial();


const tgKey = "WebtoonEpisodeImage";

TG.add(tgKey, "WebtoonEpisodeImageFormT", webtoonEpisodeImageFormSchema);
TG.add(tgKey, "_WebtoonEpisodeImageT", webtoonEpisodeImageSchema, { private: true });

TG.add(tgKey, "GetWebtoonEpisodeImageOptionT", getWebtoonEpisodeImageOptionSchema);
TG.add(tgKey, "ListWebtoonEpisodeImageOptionT", listWebtoonEpisodeImageOptionSchema);

