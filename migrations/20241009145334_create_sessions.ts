import { Knex } from "knex";

const table = "sessions";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table, (t) => {
    t.uuid("jti").primary();
    t.integer("userId")
      .notNullable()
      .references("users.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    t.timestamp("expires").notNullable().index();
    t.boolean("revoked").defaultTo(false);
    t.timestamps(true, true); // Adds created_at and updated_at
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(table);
}
