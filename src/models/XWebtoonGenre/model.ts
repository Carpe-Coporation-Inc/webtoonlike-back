import { DataModel } from "@/utils/orm";
import type { XWebtoonGenreFormT, XWebtoonGenreT } from "@/types/XWebtoonGenre";


const table = "x_webtoon_genres";
export const xWebtoonGenreM = new DataModel<XWebtoonGenreFormT, XWebtoonGenreT>(table);


