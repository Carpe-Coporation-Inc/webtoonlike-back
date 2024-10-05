import { Knex } from "knex";

const table = "webtoon_episode_images";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table, (t) => {
    t.increments("id").primary();
    t.datetime("createdAt").defaultTo(knex.fn.now());
    t.datetime("updatedAt");

    t.integer("episodeId").notNullable().references("webtoon_episodes.id").onUpdate("CASCADE").onDelete("CASCADE");

    t.string("host");
    t.string("path").notNullable();
    t.string("mimeType").notNullable();
    t.integer("width");
    t.integer("height");
    t.integer("rank");
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(table);
}

