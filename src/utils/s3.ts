import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/global/s3";
import { env } from "@/env";

export async function createSignedUrl(key: string, contentType: string): Promise<string> {
  const comamand = new PutObjectCommand({
    Bucket: env.S3_BUCKET ?? "",
    Key: key,
    ContentType: contentType,
  });
  const signedUrl = await getSignedUrl(s3Client, comamand, { expiresIn: 60 * 60 * 24 * 7 });
  return signedUrl;
}

export function putDevPrefix(key: string): string {
  return env.STAGE == "dev" ? `dev/${key}` : key;
}


export async function getObject(key: string) : Promise<string|undefined> {
  const command = new GetObjectCommand({
    Bucket: env.S3_BUCKET ?? "",
    Key: key,
  });


  const response = await s3Client.send(command);

  // Assuming the response body is a stream, we'll convert it to a buffer
  const buffer = await streamToBuffer(response.Body);

  // Convert the buffer to a base64 string
  const base64 = buffer.toString("base64");

  // To use this string in an HTML image src, you need to prepend the Data URL scheme
  const mimeType = response.ContentType; // Change this according to your actual image MIME type
  const imageDataUrl = `data:${mimeType};base64,${base64}`;

  return imageDataUrl;
}

// Helper function to convert a stream into a buffer
function streamToBuffer(stream: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    stream.on("data", (chunk: Uint8Array) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}
