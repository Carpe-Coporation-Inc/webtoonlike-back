import { z } from "zod";
import { baseModelSchema, insertFormSchema, getOptionSchema } from "../$commons/schema";
import { TG } from "@/utils/type_generator";


const genreFormZ = {
  label: z.string(),
  label_en: z.string().nullish(),
  rank: z.number().int().nullish(),
};

export const genreFormSchema = insertFormSchema.extend(genreFormZ);
export const genreSchema = baseModelSchema.extend(genreFormZ);

export const getGenreOptionSchema = getOptionSchema.extend({});
export const listGenreOptionSchema = getGenreOptionSchema.extend({});


const tgKey = "Genre";

TG.add(tgKey, "GenreFormT", genreFormSchema);
TG.add(tgKey, "GenreT", genreSchema);

TG.add(tgKey, "GetGenreOptionT", getGenreOptionSchema);
TG.add(tgKey, "ListGenreOptionT", listGenreOptionSchema);
