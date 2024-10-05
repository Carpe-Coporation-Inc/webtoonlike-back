import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE webtoons
    ADD COLUMN "authorDetail_en" text;
  `);
}


export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE webtoons
    DROP COLUMN "authorDetail_en";
  `);
}
