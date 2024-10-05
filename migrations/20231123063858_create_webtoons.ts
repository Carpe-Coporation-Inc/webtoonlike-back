import { Knex } from "knex";

const table = "webtoons";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table, (t) => {
    t.increments("id").primary();
    t.datetime("createdAt").defaultTo(knex.fn.now());
    t.datetime("updatedAt");

    t.integer("authorId").references("users.id").onDelete("SET NULL").onUpdate("CASCADE");
    t.string("title").notNullable();
    t.string("title_en");
    t.text("description");
    t.text("description_en");
    t.text("authorDetail");
    t.string("thumbHost");
    t.string("thumbPath");

    t.integer("numLike").defaultTo(0);

    t.text("externalUrl");
    t.text("englishUrl");
    t.boolean("adultOnly").defaultTo(false);
    t.json("targetAge");
    t.string("ageLimit");
    t.string("targetGender");

    t.dateTime("modifiedAt");
    t.dateTime("publishedAt");
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(table);
}

