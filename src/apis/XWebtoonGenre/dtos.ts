import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
import { xWebtoonGenreFormSchema } from "@/models/XWebtoonGenre";
// import { } from "@/types/_";


// create
export class CreateXWebtoonGenreDto extends createZodDto(z.object({
  form: xWebtoonGenreFormSchema,
})) {}

// delete
export class DeleteXWebtoonGenreDto extends createZodDto(z.object({
  webtoonId: z.number(),
  genreId: z.number(),
})) {}


// resetByWebtoon
export class ResetByWebtoonDto extends createZodDto(z.object({
  webtoonId: z.number(),
})) {}