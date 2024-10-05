import { Knex } from "knex";

const table = "webtoon_likes";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table, (t) => {
    t.increments("id").primary();
    t.datetime("createdAt").defaultTo(knex.fn.now());
    t.datetime("updatedAt");

    t.integer("userId").references("users.id").onDelete("SET NULL").onUpdate("CASCADE");
    t.integer("webtoonId").references("webtoons.id").onDelete("SET NULL").onUpdate("CASCADE");

    t.unique(["userId", "webtoonId"]);
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(table);
}

