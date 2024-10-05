import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
import { webtoonFormSchema, listWebtoonOptionSchema, getWebtoonOptionSchema } from "@/models/Webtoon";
// import { } from "@/types/_";


// create
export class CreateWebtoonDto extends createZodDto(z.object({
  form: webtoonFormSchema
})) { }

// list
export class ListWebtoonDto extends createZodDto(listWebtoonOptionSchema) { }

// get
export class GetWebtoonDto extends createZodDto(getWebtoonOptionSchema) { }

// update
export class UpdateWebtoonDto extends createZodDto(z.object({
  form: webtoonFormSchema.partial(),
})) { }

// getThumbnailPresignedUrl
export class GetThumbnailPresignedUrlDto extends createZodDto(z.object({
  mimeType: z.string(),
})) { }