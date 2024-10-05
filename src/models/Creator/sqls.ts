import { SqlInjector } from "@/utils/orm";
import { knex, type QueryBuilder } from "@/global/db";

export class CreatorSqls extends SqlInjector {
  constructor(table: string) {
    super(table);
  }

  user(): QueryBuilder {
    return knex.select(knex.raw("TO_JSON(users)"))
      .from("users")
      .whereRaw(`"users"."id" = "${this.table}"."userId"`)
      .as("user");
  }

  numWebtoon(): QueryBuilder {
    return knex.count("*")
      .from("webtoons")
      .whereRaw(`"webtoons"."authorId" = "${this.table}"."userId"`)
      .as("numWebtoon");
  }

  numWebtoonLike(): QueryBuilder {
    return knex.sum("webtoons.numLike")
      .from("webtoons")
      .whereRaw(`"webtoons"."authorId" = "${this.table}"."userId"`)
      .as("numWebtoonLike");
  }
}
