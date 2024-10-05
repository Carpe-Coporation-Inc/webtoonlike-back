import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
import {
  bidRequestMessageFormSchema, listBidRequestMessageOptionSchema,
} from "@/models/BidRequestMessage";


// create
export class CreateBidRequestMessageDto extends createZodDto(z.object({
  form: bidRequestMessageFormSchema,
})) {}

// list
export class ListBidRequestMessageDto extends createZodDto(listBidRequestMessageOptionSchema) {}
