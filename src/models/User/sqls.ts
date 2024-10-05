import { SqlInjector } from "@/utils/orm";
import { knex, QueryBuilder } from "@/global/db";

export class UserSqls extends SqlInjector {
  constructor(table: string) {
    super(table);
  }

  creator(): QueryBuilder {
    return knex.select(knex.raw("TO_JSON(creators)"))
      .from("creators")
      .whereRaw(`"creators"."userId" = "${this.table}"."id"`)
      .as("creator");
  }

  buyer(): QueryBuilder {
    return knex.select(knex.raw("TO_JSON(buyers)"))
      .from("buyers")
      .whereRaw(`"buyers"."userId" = "${this.table}"."id"`)
      .as("buyer");
  }
}
