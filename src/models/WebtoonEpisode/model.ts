import { DataModel } from "@/utils/orm";
import type { WebtoonEpisodeFormT, WebtoonEpisodeT } from "@/types/WebtoonEpisode";


const table = "webtoon_episodes";
export const webtoonEpisodeM = new DataModel<WebtoonEpisodeFormT, WebtoonEpisodeT>(table);


