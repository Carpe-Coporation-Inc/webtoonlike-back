import { webtoonEpisodeM } from "@/models/WebtoonEpisode";
import { encodeCursor, decodeCursor } from "@/utils/formatter";
import { lookupBuilder } from "./lookup_builder";
import { ListWebtoonEpisodeOptionT, WebtoonEpisodeT } from "@/types";


export async function listWebtoonEpisode(opt: ListWebtoonEpisodeOptionT): Promise<ListData<WebtoonEpisodeT>> {
  const limit = opt.limit || 30;
  let nextCursor: string|null = null;
  let getNextCursor: (item: WebtoonEpisodeT) => string|null = () => null;

  const fetched = await webtoonEpisodeM.find({
    builder: (qb, select) => {
      qb.limit(limit);
      qb.orderBy("createdAt", "desc");
      getNextCursor = (item) => encodeCursor({ createdAt: item.createdAt });

      if (opt.cursor) {
        const cursor = decodeCursor(opt.cursor);
        qb.where("createdAt", "<", cursor.createdAt);
      }

      // webtoonId
      if (opt.webtoonId) {
        qb.where({ webtoonId: opt.webtoonId });
      }
      lookupBuilder(select, opt);
    }
  });

  if (fetched.length >= limit) {
    const lastItem = fetched[fetched.length - 1];
    nextCursor = getNextCursor(lastItem);
  }

  return {
    data: fetched,
    nextCursor,
  };
}