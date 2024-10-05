import { DataModel } from "@/utils/orm";
import type { InvoiceFormT, InvoiceT } from "@/types/Invoice";


const table = "invoices";
export const invoiceM = new DataModel<InvoiceFormT, InvoiceT>(table);


