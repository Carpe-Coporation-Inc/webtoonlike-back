import { Knex } from "knex";

const table = "invoices";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table, (t) => {
    t.increments("id").primary();
    t.datetime("createdAt").defaultTo(knex.fn.now());
    t.datetime("updatedAt");

    t.integer("requestId").notNullable().references("bid_requests.id").onDelete("CASCADE").onUpdate("CASCADE");
    t.integer("creatorUid").references("users.id").onDelete("SET NULL").onUpdate("CASCADE");
    t.integer("buyerUid").references("users.id").onDelete("SET NULL").onUpdate("CASCADE");
    t.text("dataUri").notNullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(table);
}

