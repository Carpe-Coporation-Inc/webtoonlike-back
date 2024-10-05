import { SqlInjector } from "@/utils/orm";
// import {} from '@/types'
import { knex, type QueryBuilder } from "@/global/db";

export class BidRoundSqls extends SqlInjector {
  constructor(table: string) {
    super(table);
  }

  user(): QueryBuilder{
    return knex.select(knex.raw("TO_JSON(u.*)::json"))
      .from({ u: "users" })
      .whereRaw(`u.id = "${this.table}"."userId"`)
      .as("user");
  }

  webtoon(): QueryBuilder{
    return knex.select(knex.raw("TO_JSON(w.*)::json"))
      .from({ w: "webtoons" })
      .whereRaw(`w.id = "${this.table}"."webtoonId"`)
      .as("webtoon");
  }

  requests(): QueryBuilder {
    return knex.select(knex.raw(`
      COALESCE(ARRAY_TO_JSON(ARRAY_AGG(br ORDER BY "br"."createdAt" DESC)), '[]'::JSON)
      FROM bid_requests AS br
      WHERE "br"."roundId" = "${this.table}"."id"
    `)).as("requests");
  }
}
