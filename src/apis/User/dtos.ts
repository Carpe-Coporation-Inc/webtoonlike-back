import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
import { userFormSchema, getUserOptionSchema, listUserOptionSchema } from "@/models/User";
// import { } from "@/types/_";


// create
export class CreateUserDto extends createZodDto(z.object({
  form: userFormSchema,
})) {}


// get
export class GetUserDto extends createZodDto(getUserOptionSchema) {}


// list
export class ListUserDto extends createZodDto(listUserOptionSchema) {}