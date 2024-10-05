import { SqlInjector } from "@/utils/orm";
import { knex } from "@/global/db";

export class BidRequestMessageSqls extends SqlInjector {
  constructor(table: string) {
    super(table);
  }

  creator() {
    return 
  }

  buyer() {

  }

}
