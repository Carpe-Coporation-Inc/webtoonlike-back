import { SqlInjector } from "@/utils/orm";
import { knex, QueryBuilder } from "@/global/db";

export class WebtoonSqls extends SqlInjector {
  constructor(table: string) {
    super(table);
  }

  creator(): QueryBuilder {
    return knex.select(knex.raw("TO_JSON(creators)"))
      .from("creators")
      .whereRaw(`"creators"."userId" = "${this.table}"."authorId"`)
      .as("creator");
  }

  episodes(): QueryBuilder {
    return knex.select(knex.raw(`
      COALESCE(ARRAY_TO_JSON(ARRAY_AGG(we ORDER BY "we"."publishedAt" ASC)), '[]'::JSON)
      FROM (
        SELECT * FROM webtoon_episodes AS we_
        WHERE "we_"."webtoonId" = "${this.table}"."id"
        LIMIT 3
      ) AS "we"
      --AND "we"."publishedAt" IS NOT NULL
    `)).as("episodes");
  }

  numEpisode(): QueryBuilder {
    return knex.count("*")
      .from("webtoon_episodes")
      .whereRaw(`"webtoon_episodes"."webtoonId" = "${this.table}"."id"`)
      .as("numEpisode");
  }


  myLike(meId: idT): QueryBuilder {
    return knex.select(knex.raw(`EXISTS (
      SELECT 1 FROM "webtoon_likes" AS wl
      WHERE "wl"."webtoonId" = "${this.table}"."id" AND "wl"."userId" = ?
    ) AS "myLike"`), [meId]);
  }

  bidRounds(): QueryBuilder {
    return knex.select(knex.raw(`
      COALESCE(ARRAY_TO_JSON(ARRAY_AGG(br ORDER BY "br"."createdAt" DESC)), '[]'::JSON)
      FROM (
        SELECT * FROM bid_rounds AS br_
        WHERE "br_"."webtoonId" = "${this.table}"."id"
        --LIMIT 1
      ) AS "br"
    `)).as("bidRounds");
    // return knex.select(knex.raw("TO_JSON(br)"))
    //   .from("bid_rounds AS br")
    //   .whereRaw(`"br"."webtoonId" = "${this.table}"."id"`)
    //   .orderBy("br.createdAt", "DESC")
    //   .limit(1)
    //   .as("bidRound");
  }

  // _videos(): QueryBuilder {
  //   return knex.select(knex.raw(`
  //     COALESCE(ARRAY_TO_JSON(ARRAY_AGG(videos.*)), '[]'::JSON)
  //     FROM x_post_video as xpv
  //     inner JOIN videos ON videos.id = xpv.video_id
  //     WHERE xpv.post_id = ${this.table}.id
  //   `)).as("videos");
  // }

  genres(): QueryBuilder {
    return knex.select(knex.raw(`
      COALESCE(ARRAY_TO_JSON(ARRAY_AGG(g ORDER BY "g"."rank" ASC)), '[]'::JSON)
      FROM x_webtoon_genres AS xwg
      INNER JOIN genres AS g ON g."id" = xwg."genreId"
      WHERE xwg."webtoonId" = "${this.table}"."id"
    `))
      .as("genres");
  }
  // FROM (
  //   SELECT * FROM genres AS g_
  //   INNER JOIN x_webtoon_genres AS xwg ON xwg."genreId" = g_."id"
  //   WHERE xwg."webtoonId" = "${this.table}"."id"
  // ) AS "g"

  numRequest(): QueryBuilder {
    return knex.count("*")
      .from("bid_requests")
      .join("bid_rounds", "bid_requests.roundId", "bid_rounds.id")
      .whereRaw(`"bid_rounds"."webtoonId" = "${this.table}"."id"`)
      .as("numRequest");
  }
}
