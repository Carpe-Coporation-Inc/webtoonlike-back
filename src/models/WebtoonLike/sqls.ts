import { SqlInjector } from "@/utils/orm";
// import { knex } from "@/global/db";

export class WebtoonLikeSqls extends SqlInjector {
  constructor(table: string) {
    super(table);
  }
}
