import { z } from "zod";
import { baseModelSchema, insertFormSchema } from "../$commons/schema";
import { TG } from "@/utils/type_generator";


const xWebtoonGenreFormZ = {
  webtoonId: z.number().int(),
  genreId: z.number().int(),
};

export const xWebtoonGenreFormSchema = insertFormSchema.extend(xWebtoonGenreFormZ);
export const xWebtoonGenreSchema = baseModelSchema.extend(xWebtoonGenreFormZ);


const tgKey = "XWebtoonGenre";

TG.add(tgKey, "XWebtoonGenreFormT", xWebtoonGenreFormSchema);
TG.add(tgKey, "XWebtoonGenreT", xWebtoonGenreSchema);