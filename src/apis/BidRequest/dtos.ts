import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
import { bidRequestFormSchema, getBidRequestOptionSchema, listBidRequestOptionSchema } from "@/models/BidRequest";
// import { } from "@/types/_";

// list
export class ListBidRequestDto extends createZodDto(listBidRequestOptionSchema) {}

// get
export class GetBidRquestDto extends createZodDto(getBidRequestOptionSchema) {}

// create
export class CreateBidRequestDto extends createZodDto(z.object({
  form: bidRequestFormSchema,
})) {}

// update
export class UpdateBidRequestDto extends createZodDto(z.object({
  form: bidRequestFormSchema.partial(),
})) {}

// delete
// no dto

// accept
export class AcceptBidRequestDto extends createZodDto(z.object({
  id: z.number().int(),
})) {}

// reject
export class RejectBidRequestDto extends createZodDto(z.object({
  id: z.number().int(),
})) {}


// cancel
export class CancelBidRequestDto extends createZodDto(z.object({
  id: z.number().int(),
})) {}


// publishInvoice
export class PublishInvoiceDto extends createZodDto(z.object({
  requestId: z.number().int(),
})) {}


// confirmInvoice
export class ConfirmInvoiceDto extends createZodDto(z.object({
  requestId: z.number().int(),
  base64data: z.string(),
})) {}


