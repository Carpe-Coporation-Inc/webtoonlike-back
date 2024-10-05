import { creatorM, CreatorSqls } from "@/models/Creator";
import type { GetCreatorOptionT } from "@/types";

export function lookupBuilder(select: any[], opt: GetCreatorOptionT): void {
  const sqls = new CreatorSqls(creatorM.table);

  if (opt.$numWebtoon) {
    select.push(sqls.numWebtoon());
  }

  if (opt.$numWebtoonLike) {
    select.push(sqls.numWebtoonLike());
  }

  if (opt.$user) {
    select.push(sqls.user());
  }
}