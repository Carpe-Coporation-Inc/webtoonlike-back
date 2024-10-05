import { Knex } from "knex";

const table = "bid_rounds";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table, (t) => {
    t.increments("id").primary();
    t.datetime("createdAt").defaultTo(knex.fn.now());
    t.datetime("updatedAt");

    t.integer("userId").references("users.id").onDelete("SET NULL").onUpdate("CASCADE");
    t.integer("webtoonId").notNullable().references("webtoons.id").onDelete("CASCADE").onUpdate("CASCADE");

    t.boolean("isWebtoon");
    t.boolean("isSecondary");
    t.json("contractRange");
    // t.json("secondaryRange");

    t.string("status").notNullable(); // ['idle', 'waitingApproval', 'watingBidding', 'bidding', 'negotiating', 'done']
    t.string("originality").notNullable(); // ['original', 'notOriginal']
    t.boolean("isBrandNew").notNullable();
    t.integer("numEpisode");
    t.dateTime("bidStartAt");
    t.dateTime("negoStartAt");
    t.dateTime("processEndAt");

    t.dateTime("approvedAt");
    t.dateTime("disapprovedAt");
    t.text("adminMemo");
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(table);
}
