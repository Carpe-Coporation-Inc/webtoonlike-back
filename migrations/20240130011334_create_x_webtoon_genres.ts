import { Knex } from "knex";

const table = "x_webtoon_genres";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table, (t) => {
    t.increments("id").primary();
    t.datetime("createdAt").defaultTo(knex.fn.now());
    t.datetime("updatedAt");

    t.integer("webtoonId").notNullable().references("webtoons.id").onDelete("CASCADE").onUpdate("CASCADE");
    t.integer("genreId").notNullable().references("genres.id").onDelete("CASCADE").onUpdate("CASCADE");
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(table);
}

