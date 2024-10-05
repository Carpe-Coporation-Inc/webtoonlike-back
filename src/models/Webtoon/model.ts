import { DataModel } from "@/utils/orm";
import type { WebtoonFormT, WebtoonT } from "@/types/Webtoon";


const table = "webtoons";
export const webtoonM = new DataModel<WebtoonFormT, WebtoonT>(table);


