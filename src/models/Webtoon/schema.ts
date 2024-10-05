import { z } from "zod";
import { baseModelSchema, insertFormSchema, getOptionSchema, listOptionSchema } from "../$commons/schema";
import { bidStatusEnum } from "../BidRound";
import { TG } from "@/utils/type_generator";

const webtoonAgeLimitEnum = z.enum(["12+", "15+", "18+"]);
const webtoonTargetAgeEnum = z.enum(["10-20", "20-30", "30-40", "40-50", "50-60"]);
const webtoonTargetGenderEnum = z.enum(["male", "female"]);

const webtoonSortEnum = z.enum(["recent", "old", "popular"]);

const webtoonFormZ = {
  authorId: z.number().int().nullable(),
  title: z.string(),
  title_en: z.string().nullable(),
  description: z.string().nullish(),
  description_en: z.string().nullish(),
  authorDetail: z.string().nullish(),
  authorDetail_en: z.string().nullish(),
  thumbHost: z.string().nullish(),
  thumbPath: z.string().nullish(),

  numLike: z.number().int().optional(),

  externalUrl: z.string().nullish().describe("외부 연재 중인 웹툰의 url"),
  englishUrl: z.string().nullish().describe("영어 번역 url"),
  adultOnly: z.boolean().optional(),
  targetAge: z.object({
    data: z.array(webtoonTargetAgeEnum),
  }).nullish(),
  ageLimit: webtoonAgeLimitEnum.nullish(),
  targetGender: webtoonTargetGenderEnum.nullish(),

  modifiedAt: z.date().nullish(),
  publishedAt: z.date().nullish(),
};

export const webtoonFormSchema = insertFormSchema.extend(webtoonFormZ);
export const webtoonSchema = baseModelSchema.extend({
  ...webtoonFormZ,
  // optional
  numLike: z.number().int(),
});

export const getWebtoonOptionSchema = getOptionSchema.extend({
  $creator: z.coerce.boolean(),
  $episodes: z.coerce.boolean(),
  $numEpisode: z.coerce.boolean(),
  $numRequest: z.coerce.boolean(),
  $myLike: z.coerce.boolean(),
  $bidRounds: z.coerce.boolean(),
  $genres: z.coerce.boolean(),
}).partial();
export const listWebtoonOptionSchema = listOptionSchema.extend({
  ...getWebtoonOptionSchema.shape,
  sort: webtoonSortEnum,
  authorId: z.coerce.number().int(),
  like: z.enum(["only", "except"]),
  mine: z.enum(["only", "except"]),
  bidStatus: bidStatusEnum.or(z.string()).describe("pass comma separated string for array of status"),
  ageLimit: webtoonAgeLimitEnum,
  genreId: z.coerce.number().int(),
  // adult: z.enum(["only", "except"]),
  // targetAge: webtoonTargetAgeEnum,
  // targetGender: webtoonTargetGenderEnum,
}).partial();


const tgKey = "Webtoon";

TG.add(tgKey, "WebtoonFormT", webtoonFormSchema);
TG.add(tgKey, "_WebtoonT", webtoonSchema, { private: true });

TG.add(tgKey, "GetWebtoonOptionT", getWebtoonOptionSchema);
TG.add(tgKey, "ListWebtoonOptionT", listWebtoonOptionSchema);

TG.add(tgKey, "WebtoonSortT", webtoonSortEnum);

