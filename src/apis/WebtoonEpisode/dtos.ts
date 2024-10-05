import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
import {
  webtoonEpisodeFormSchema,
  getWebtoonEpisodeOptionSchema,
  listWebtoonEpisodeOptionSchema,
} from "@/models/WebtoonEpisode";
import { webtoonEpisodeImageFormSchema } from "@/models/WebtoonEpisodeImage";
// import { } from "@/types/_";


// create
export class CreateWebtoonEpisodeDto extends createZodDto(z.object({
  form: webtoonEpisodeFormSchema,
  relations: z.object({
    images: z.array(webtoonEpisodeImageFormSchema).optional()
  }).optional()
})) {}

// update
export class UpdateWebtoonEpisodeDto extends createZodDto(z.object({
  form: webtoonEpisodeFormSchema.partial(),
  relations: z.object({
    images: z.array(webtoonEpisodeImageFormSchema).optional()
  }).optional()
})) {}

// delete
// no dto

// get
export class GetWebtoonEpisodeDto extends createZodDto(getWebtoonEpisodeOptionSchema) {}

// list
export class ListWebtoonEpisodeDto extends createZodDto(listWebtoonEpisodeOptionSchema) {}

// getThumbnailPresignedUrl
export class GetThumbnailPresignedUrlDto extends createZodDto(z.object({
  mimeType: z.string(),
})) { }


