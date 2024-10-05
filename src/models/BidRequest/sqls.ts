import { SqlInjector } from "@/utils/orm";
import { knex, type QueryBuilder } from "@/global/db";

export class BidRequestSqls extends SqlInjector {
  constructor(table: string) {
    super(table);
  }

  round(): QueryBuilder {
    return knex.select(knex.raw("TO_JSON(br.*)::json"))
      .from({ br: "bid_rounds" })
      .whereRaw(`br.id = "${this.table}"."roundId"`)
      .as("round");
  }

  webtoon(): QueryBuilder {
    return knex.select(knex.raw("TO_JSON(w.*)::json"))
      .from({ w: "webtoons" })
      .leftJoin({ br: "bid_rounds" }, "br.webtoonId", "w.id")
      .whereRaw(`br.id = "${this.table}"."roundId"`)
      .as("webtoon");
  }

  creator(): QueryBuilder {
    return knex.select(knex.raw("TO_JSON(c.*)::json"))
      .from({ c: "creators" })
      .leftJoin({ w: "webtoons" }, "w.authorId", "c.userId")
      .leftJoin({ br: "bid_rounds" }, "br.webtoonId", "w.id")
      .whereRaw(`"br"."id" = "${this.table}"."roundId"`)
      .as("creator");
  }


  buyer(): QueryBuilder {
    return knex.select(knex.raw("TO_JSON(b.*)::json"))
      .from({ b: "buyers" })
      .where("b.userId", knex.raw(`"${this.table}"."userId"`))
      .as("buyer");
  }

  invoice(): QueryBuilder {
    return knex.select(knex.raw("TO_JSON(i.*)::json"))
      .from({ i: "invoices" })
      .whereRaw(`"i"."requestId" = "${this.table}"."id"`)
      .limit(1)
      .as("invoice");
  }
}
