import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE creators
    ADD COLUMN "name_en" text;
  `);
}


export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE creators
    DROP COLUMN "name_en";
  `);
}
