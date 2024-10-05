import type { Knex } from "knex";
import { env } from "./env";

const config: { [key: string]: Knex.Config } = {
  dev: {
    client: "postgresql",
    connection: {
      host: env.DB_HOST,
      user: env.DB_USER,
      port: (env.DB_PORT ?? 5432) as number,
      password: env.DB_PASS,
      database: "kenazip_dev",
    },
    debug: true,
    migrations: {
      directory: "../migrations",
    },
    pool: { min: 2, max: 10 },
    seeds: {
      directory: "../seeds/dev",
    },
  },
  prod: {
    client: "postgresql",
    connection: {
      host: env.DB_HOST,
      user: env.DB_USER,
      port: (env.DB_PORT ?? 5432) as number,
      password: env.DB_PASS,
      database: "kenazip_prod",
    },
    migrations: {
      directory: "../migrations",
    },
    pool: { min: 2, max: 10 },
  },
};

const stage = env.STAGE ?? "dev";
const knexConfig = config[stage];

export default knexConfig;
