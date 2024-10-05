import { Knex } from "knex";

const table = "genres";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table, (t) => {
    t.increments("id").primary();
    t.datetime("createdAt").defaultTo(knex.fn.now());
    t.datetime("updatedAt");

    t.string("label").notNullable().unique();
    t.string("label_en").unique();
    t.integer("rank");
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(table);
}

