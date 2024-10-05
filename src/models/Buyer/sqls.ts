import { SqlInjector } from "@/utils/orm";
// import { knex } from "@/global/db";

export class BuyerSqls extends SqlInjector {
  constructor(table: string) {
    super(table);
  }
}
