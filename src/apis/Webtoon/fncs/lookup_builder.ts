import { webtoonM, WebtoonSqls } from "@/models/Webtoon";
import type { GetWebtoonOptionT } from "@/types/Webtoon";

export function lookupBuilder(select: any[], opt: GetWebtoonOptionT) {
  const sqls = new WebtoonSqls(webtoonM.table);

  if (opt.$episodes) {
    select.push(sqls.episodes());
  }

  if (opt.$numEpisode) {
    select.push(sqls.numEpisode());
  }

  if (opt.$numRequest) {
    select.push(sqls.numRequest());
  }

  if (opt.$bidRounds) {
    select.push(sqls.bidRounds());
  }

  if (opt.$myLike && opt.meId) {
    select.push(sqls.myLike(opt.meId));
  }

  if (opt.$creator) {
    select.push(sqls.creator());
  }

  if (opt.$genres) {
    select.push(sqls.genres());
  }
}