import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
import { creatorFormSchema, listCreatorOptionSchema, getCreatorOptionSchema } from "@/models/Creator";
// import { } from "@/types/_";


// create
export class CreateCreatorDto extends createZodDto(z.object({
  form: creatorFormSchema,
})) {}

// list
export class ListCreatorDto extends createZodDto(listCreatorOptionSchema) {}

// get
export class GetCreatorDto extends createZodDto(getCreatorOptionSchema) {}

// getThumbnailPresignedUrl
export class GetThumbnailPresignedUrlDto extends createZodDto(z.object({
  mimeType: z.string(),
})) { }

// update
export class UpdateCreatorDto extends createZodDto(z.object({
  form: creatorFormSchema.partial(),
})) {}