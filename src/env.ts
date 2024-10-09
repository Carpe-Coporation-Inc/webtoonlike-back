import dotenv from "dotenv";
import { z } from "zod";

if (process.cwd().endsWith("/src")) {
  // process running from src folder
  dotenv.config({ path: "../.env" });
} else {
  dotenv.config();
}


const envSchema = z.object({
  STAGE: z.enum(["dev", "prod"]),
  PORT: z.coerce.number(),

  // DB config
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_PORT: z.coerce.number(),

  // Credential config
  SYSTEM_SECRET: z.string(),

  // Clerk config
  CLERK_PEM_PUBLIC_KEY: z.string(),

  // internal token
  TOKEN_SECRET_KEY: z.string(),

  // AWS config
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_KEY_ID: z.string(),
  // S3 config
  S3_BUCKET: z.string(),
  S3_REGION: z.string(),
});


export const env = envSchema.parse(process.env);

console.log("env:", env);

