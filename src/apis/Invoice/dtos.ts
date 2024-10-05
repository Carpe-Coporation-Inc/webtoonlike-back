import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
import { listInvoiceOptionSchema } from "@/models/Invoice";
// import { } from "@/types/_";


// list
export class ListInvoiceDto extends createZodDto(listInvoiceOptionSchema) {}
