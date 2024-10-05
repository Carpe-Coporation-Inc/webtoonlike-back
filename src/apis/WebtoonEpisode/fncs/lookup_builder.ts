import { WebtoonEpisodeSqls, webtoonEpisodeM } from "@/models/WebtoonEpisode";
import type { GetWebtoonEpisodeOptionT } from "@/types/WebtoonEpisode";

export function lookupBuilder(select: any[], getOpt: GetWebtoonEpisodeOptionT ): void {
  const sqls = new WebtoonEpisodeSqls(webtoonEpisodeM.table);

  if (getOpt.$images) {
    select.push(sqls.images());
  }
}