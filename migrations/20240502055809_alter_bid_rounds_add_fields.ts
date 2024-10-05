import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE bid_rounds 
    ADD COLUMN "nowEpisode" integer;

    ALTER TABLE bid_rounds 
    ADD COLUMN "monthlyNumEpisode" integer;
  `);
}


export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE bid_rounds 
    DROP COLUMN "nowEpisode";

    ALTER TABLE bid_rounds
    DROP COLUMN "monthlyNumEpisode";
  `);
}
