import { z } from "zod";
import { baseModelSchema, insertFormSchema, getOptionSchema, listOptionSchema } from "../$commons/schema";
import { TG } from "@/utils/type_generator";


export const invoiceFormSchema = insertFormSchema.extend({
  requestId: z.number().int(),
  creatorUid: z.number().int().nullable(),
  buyerUid: z.number().int().nullable(),
  dataUri: z.string(),
});

export const invoiceSchema = baseModelSchema.extend(invoiceFormSchema.shape);

export const getInvoiceOptionSchema = getOptionSchema.extend({
  $request: z.coerce.boolean(),
  $webtoon: z.coerce.boolean(),
  $creator: z.coerce.boolean(),
  $buyer: z.coerce.boolean(),
}).partial();
export const listInvoiceOptionSchema = listOptionSchema.extend({
  ...getInvoiceOptionSchema.shape,
  creatorUid: z.coerce.number().int(),
  buyerUid: z.coerce.number().int(),
}).partial();


const tgKey = "Invoice";

TG.add(tgKey, "InvoiceFormT", invoiceFormSchema);
TG.add(tgKey, "_InvoiceT", invoiceSchema, { private: true });

TG.add(tgKey, "GetInvoiceOptionT", getInvoiceOptionSchema);
TG.add(tgKey, "ListInvoiceOptionT", listInvoiceOptionSchema);

