import { Knex } from "knex";

const table = "webtoon_episodes";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table, (t) => {
    t.increments("id").primary();
    t.datetime("createdAt").defaultTo(knex.fn.now());
    t.datetime("updatedAt");

    t.integer("authorId").references("users.id").onDelete("SET NULL").onUpdate("CASCADE");
    t.integer("webtoonId").notNullable().references("webtoons.id").onDelete("CASCADE").onUpdate("CASCADE");

    t.text("englishUrl");

    t.integer("episodeNo").notNullable();
    t.string("title");
    t.string("title_en");
    t.string("description");
    t.string("thumbPath");
    t.dateTime("modifiedAt");
    t.dateTime("publishedAt");

  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(table);
}