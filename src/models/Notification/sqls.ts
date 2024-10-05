import { SqlInjector } from "@/utils/orm";
// import { knex } from "@/global/db";

export class NotificationSqls extends SqlInjector {
  constructor(table: string) {
    super(table);
  }
}
