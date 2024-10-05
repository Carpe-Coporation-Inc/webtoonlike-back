import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
import { genreFormSchema, getGenreOptionSchema, listGenreOptionSchema } from "@/models/Genre";
// import { } from "@/types/_";


// create
export class CreateGenreDto extends createZodDto(z.object({
  form: genreFormSchema,
})) {}

// get
export class GetGenreDto extends createZodDto(getGenreOptionSchema) {}

// list
export class ListGenreDto extends createZodDto(listGenreOptionSchema) {}

// update
export class UpdateGenreDto extends createZodDto(z.object({
  form: genreFormSchema.partial(),
})) {}

// delete
// no dto

