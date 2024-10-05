import { Knex } from "knex";

const table = "bid_requests";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table, (t) => {
    t.increments("id").primary();
    t.datetime("createdAt").defaultTo(knex.fn.now());
    t.datetime("updatedAt");

    t.integer("userId").references("users.id").onDelete("SET NULL").onUpdate("CASCADE");
    t.integer("roundId").notNullable().references("bid_rounds.id").onDelete("CASCADE").onUpdate("CASCADE");

    t.text("message");

    t.json("contractRange");

    t.dateTime("acceptedAt");
    t.dateTime("rejectedAt");

    t.dateTime("approvedAt");
    t.dateTime("cancelledAt");
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(table);
}
