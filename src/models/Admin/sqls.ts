import { SqlInjector } from "@/utils/orm";
import { knex, QueryBuilder } from "@/global/db";

export class AdminSqls extends SqlInjector {
  constructor(table: string) {
    super(table);
  }

  user(): QueryBuilder {
    return knex.select(knex.raw("TO_JSON(u.*)::json"))
      .from({ u: "users" })
      .whereRaw(`u.id = "${this.table}"."userId"`)
      .as("user");
  }
}
