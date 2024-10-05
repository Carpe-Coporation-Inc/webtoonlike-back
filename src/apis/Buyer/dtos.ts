import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
import { buyerFormSchema } from "@/models/Buyer";
// import { } from "@/types/_";


// create
export class CreateBuyerDto extends createZodDto(z.object({
  form: buyerFormSchema,
})) {}


// getThumbnailPresignedUrl
export class GetThumbnailPresignedUrlDto extends createZodDto(z.object({
  mimeType: z.string(),
})) { }


// getBusinessCertPresignedUrl
export class GetBusinessCertPresignedUrlDto extends createZodDto(z.object({
  mimeType: z.string(),
})) { }


// getBusinessCardPresignedUrl
export class GetBusinessCardPresignedUrlDto extends createZodDto(z.object({
  mimeType: z.string(),
})) { }