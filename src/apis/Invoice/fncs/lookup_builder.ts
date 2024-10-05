
import { invoiceM,InvoiceSqls } from "@/models/Invoice";
import type { GetInvoiceOptionT } from "@/types";

export function lookupBuilder(select: any[], opt: GetInvoiceOptionT): void {
  const sqls = new InvoiceSqls(invoiceM.table);

  if (opt.$buyer) {
    select.push(sqls.buyer());
  }
  if (opt.$creator) {
    select.push(sqls.creator());
  }

  if (opt.$request) {
    select.push(sqls.request());
  }
  if (opt.$webtoon) {
    select.push(sqls.webtoon());
  }
}