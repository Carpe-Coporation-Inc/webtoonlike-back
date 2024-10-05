import { Knex } from "knex";

const table = "bid_request_messages";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table, (t) => {
    t.increments("id").primary();
    t.datetime("createdAt").defaultTo(knex.fn.now());
    t.datetime("updatedAt");

    t.integer("bidRequestId").notNullable().references("bid_requests.id").onDelete("CASCADE").onUpdate("CASCADE");
    t.integer("userId").notNullable().references("users.id").onDelete("CASCADE").onUpdate("CASCADE");

    t.text("content").notNullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(table);
}

