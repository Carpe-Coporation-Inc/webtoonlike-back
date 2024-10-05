import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
import { adminFormSchema, listAdminOptionSchema } from "@/models/Admin";
// import { } from "@/types/_";


// create
export class CreateAdminDto extends createZodDto(z.object({
  form: adminFormSchema,
})) {}

// createByEmail
export class CreateByEmailDto extends createZodDto(z.object({
  email: z.string().email(),
})) {}

// list
export class ListAdminDto extends createZodDto(listAdminOptionSchema) {}
