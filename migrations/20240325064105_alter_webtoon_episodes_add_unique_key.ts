import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE webtoon_episodes
    ADD CONSTRAINT "webtoon_episodes_webtoonId_episodeNo_unique"
    UNIQUE ("webtoonId", "episodeNo");
  `);
}


export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE webtoon_episodes
    DROP CONSTRAINT "webtoon_episodes_webtoonId_episodeNo_unique";
  `);
}
