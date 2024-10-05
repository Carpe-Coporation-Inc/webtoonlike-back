import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
import { webtoonLikeFormSchema } from "@/models/WebtoonLike";
// import { } from "@/types/_";


// create
export class CreateWebtoonLikeDto extends createZodDto(z.object({
  form: webtoonLikeFormSchema
})) {}


// delete
// no dto