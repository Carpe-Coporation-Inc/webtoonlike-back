import { SqlInjector } from "@/utils/orm";
import { knex, type QueryBuilder } from "@/global/db";

export class WebtoonEpisodeSqls extends SqlInjector {
  constructor(table: string) {
    super(table);
  }

  images(): QueryBuilder {
    return knex.select(knex.raw(`
      COALESCE(ARRAY_TO_JSON(ARRAY_AGG(wei ORDER BY wei.rank ASC NULLS LAST)), '[]'::JSON)
      FROM webtoon_episode_images  as wei
      WHERE "wei"."episodeId" = ${this.table}.id
    `)).as("images");
  }
}
