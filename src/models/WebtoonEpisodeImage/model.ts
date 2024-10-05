import { DataModel } from "@/utils/orm";
import type { WebtoonEpisodeImageFormT, WebtoonEpisodeImageT } from "@/types/WebtoonEpisodeImage";


const table = "webtoon_episode_images";
export const webtoonEpisodeImageM = new DataModel<WebtoonEpisodeImageFormT, WebtoonEpisodeImageT>(table);


