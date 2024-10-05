import { Knex } from "knex";

const table = "buyers";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table, (t) => {
    t.increments("id").primary();
    t.datetime("createdAt").defaultTo(knex.fn.now());
    t.datetime("updatedAt");

    t.integer("userId").references("users.id").onDelete("CASCADE").onUpdate("CASCADE");
    t.string("name").notNullable();
    t.json("companyInfo").notNullable();
    t.string("purpose");

    t.unique(["userId"]);
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(table);
}

