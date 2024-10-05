import { SqlInjector } from "@/utils/orm";
import { knex, type QueryBuilder } from "@/global/db";

export class InvoiceSqls extends SqlInjector {
  constructor(table: string) {
    super(table);
  }

  request(): QueryBuilder {
    return knex.select(knex.raw("TO_JSON(brq.*)::json"))
      .from({ brq: "bid_requests" })
      .whereRaw(`"brq"."id" = "${this.table}"."requestId"`)
      .as("round");
  }

  webtoon(): QueryBuilder {
    return knex.select(knex.raw("TO_JSON(w.*)::json"))
      .from({ brq: "bid_requests" })
      .whereRaw(`"brq"."id" = "${this.table}"."requestId"`)
      .leftJoin({ br: "bid_rounds" }, "br.id", "brq.roundId")
      .leftJoin({ w: "webtoons" }, "w.id", "br.webtoonId")
      // .from({ w: "webtoons" })
      // .leftJoin({ br: "bid_rounds" }, "br.webtoonId", "w.id")
      // .leftJoin({ brq: "bid_requests" }, "brq.id", "br.requestId")
      // .whereRaw(`brq.id = "${this.table}"."requestId"`)
      .as("webtoon");
  }

  creator(): QueryBuilder {
    return knex.select(knex.raw("TO_JSON(c.*)::json"))
      .from({ c: "creators" })
      .where("c.userId", knex.raw(`"${this.table}"."creatorUid"`))
      .as("creator");
  }

  buyer(): QueryBuilder {
    return knex.select(knex.raw("TO_JSON(b.*)::json"))
      .from({ b: "buyers" })
      .where("b.userId", knex.raw(`"${this.table}"."buyerUid"`))
      .as("buyer");
  }

}
