import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
import {
  webtoonEpisodeImageFormSchema,
  // getWebtoonEpisodeImageOptionSchema,
  listWebtoonEpisodeImageOptionSchema,
} from "@/models/WebtoonEpisodeImage";
import { } from "@/types/WebtoonEpisodeImage";


// create
export class CreateWebtoonEpisodeImageDto extends createZodDto(z.object({
  form: webtoonEpisodeImageFormSchema
})) {}

// list
export class ListWebtoonEpisodeImageDto extends createZodDto(listWebtoonEpisodeImageOptionSchema) {}

// remove
// no dto


// getImagePresignedUrl
export class GetImagePresignedUrlDto extends createZodDto(z.object({
  mimeType: z.string(),
})) { }
