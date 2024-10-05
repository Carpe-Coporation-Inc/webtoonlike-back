import { Knex } from "knex";

const table = "creators";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table, (t) => {
    t.increments("id").primary();
    t.datetime("createdAt").defaultTo(knex.fn.now());
    t.datetime("updatedAt");

    t.integer("userId").notNullable().references("users.id").onDelete("CASCADE").onUpdate("CASCADE");
    t.string("name").notNullable();
    t.text("thumbPath");
    t.string("agencyName");
    t.boolean("isNew");
    t.boolean("isExposed").defaultTo(false);

    t.unique(["userId"]);
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(table);
}

