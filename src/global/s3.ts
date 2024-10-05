import { S3Client } from "@aws-sdk/client-s3";
import { env } from "@/env";

export const s3Client = new S3Client({
  region: env.S3_REGION ?? "",
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: env.AWS_SECRET_KEY_ID ?? "",
  },
});
