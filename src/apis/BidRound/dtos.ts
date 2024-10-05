import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
import { bidRoundFormSchema, getBidRoundOptionSchema, listBidRoundOptionSchema } from "@/models/BidRound";
// import { } from "@/types/_";


// list
export class ListBidRoundDto extends createZodDto(listBidRoundOptionSchema) {}

// get
export class GetBidRoundDto extends createZodDto(getBidRoundOptionSchema) {}

// create
export class CreateBidRoundDto extends createZodDto(z.object({
  form: bidRoundFormSchema,
})) {}


// update
export class UpdateBidRoundDto extends createZodDto(z.object({
  form: bidRoundFormSchema.partial()
})) {}


// approve
export class ApproveBidRoundDto extends createZodDto(z.object({
  id: z.number().int(),
})) {}

// disapprove
export class DisapproveBidRoundDto extends createZodDto(z.object({
  id: z.number().int(),
  adminMemo: z.string(),
})) {}