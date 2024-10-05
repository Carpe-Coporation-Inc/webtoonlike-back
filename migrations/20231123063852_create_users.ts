import { Knex } from "knex";

const table = "users";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table, (t) => {
    t.increments("id").primary();
    t.datetime("createdAt").defaultTo(knex.fn.now());
    t.datetime("updatedAt");

    t.string("sub").notNullable().unique();

    t.string("email").notNullable();
    t.string("fullName").notNullable();
    t.string("phone").notNullable();
    t.enu("userType", ["creator", "buyer"]);
    t.string("country");
    t.string("postCode");
    t.string("address");
    t.string("addressDetail");


  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(table);
}

