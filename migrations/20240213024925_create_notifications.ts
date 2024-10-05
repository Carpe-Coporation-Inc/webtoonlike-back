import { Knex } from "knex";

const table = "notifications";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table, (t) => {
    t.increments("id").primary();
    t.datetime("createdAt").defaultTo(knex.fn.now());
    t.datetime("updatedAt");

    t.integer("userId").notNullable().references("users.id").onDelete("CASCADE").onUpdate("CASCADE");
    t.string("type").notNullable();
    t.text("message").notNullable();
    t.boolean("isRead").notNullable().defaultTo(false);
    t.boolean("arg");
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(table);
}

