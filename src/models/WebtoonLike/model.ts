import { DataModel } from "@/utils/orm";
import type { WebtoonLikeFormT, WebtoonLikeT } from "@/types/WebtoonLike";


const table = "webtoon_likes";
export const webtoonLikeM = new DataModel<WebtoonLikeFormT, WebtoonLikeT>(table);


