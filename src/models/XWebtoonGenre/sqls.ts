import { SqlInjector } from "@/utils/orm";
// import { knex } from "@/global/db";

export class XWebtoonGenreSqls extends SqlInjector {
  constructor(table: string) {
    super(table);
  }
}
