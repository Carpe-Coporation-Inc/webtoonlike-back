import { z } from "zod";
import { baseModelSchema, insertFormSchema, getOptionSchema, listOptionSchema } from "../$commons/schema";
import { TG } from "@/utils/type_generator";


const creatorFormZ = {
  userId: z.number().int(),
  name: z.string(),
  name_en: z.string().nullish(),
  thumbPath: z.string().nullish(),
  agencyName: z.string().nullable(),
  isNew: z.boolean(),
  isExposed: z.boolean().optional(),
};

export const creatorFormSchema = insertFormSchema.extend(creatorFormZ);

export const creatorSchema = baseModelSchema.extend(creatorFormZ);

export const getCreatorOptionSchema = getOptionSchema.extend({
  $user: z.coerce.boolean(),
  $numWebtoon: z.coerce.boolean(),
  $numWebtoonLike: z.coerce.boolean(),
});
export const listCreatorOptionSchema = listOptionSchema.extend({
  ...getCreatorOptionSchema.shape,
  limit: z.coerce.number().int(),
  cursor: z.string(),
  sort: z.enum(["recent"]),
  exposed: z.enum(["only"]),
}).partial();


const tgKey = "Creator";

TG.add(tgKey, "CreatorFormT", creatorFormSchema);
TG.add(tgKey, "_CreatorT", creatorSchema, { private: true });

TG.add(tgKey, "GetCreatorOptionT", getCreatorOptionSchema);
TG.add(tgKey, "ListCreatorOptionT", listCreatorOptionSchema);

