
import { invoiceM } from "@/models/Invoice";
import { InvoiceT, ListInvoiceOptionT } from "@/types";
import { encodeCursor, decodeCursor } from "@/utils/formatter";
import { lookupBuilder } from "./lookup_builder";
import { knex } from "@/global/db";


export async function listInvoice(opt: ListInvoiceOptionT): Promise<ListData<InvoiceT>> {
  // const table = invoiceM.table;
  const limit = opt.limit ?? 30;
  let numData: number|null = null;
  let nextCursor: string|null = null;
  let getNextCursor: (item: InvoiceT) => string|null = () => null;


  const fetched = await invoiceM.find({
    builder: (qb, select) => {
      qb.limit(limit);

      if (opt.offset) {
        qb.offset(opt.offset);
      }

      if (opt.$numData) {
        select.push(knex.raw("count(*) OVER() AS \"numData\""));
      }

      qb.orderBy("createdAt", "desc");
      getNextCursor = (item) => encodeCursor({ createdAt: item.createdAt });

      if (opt.cursor) {
        const cursor = decodeCursor(opt.cursor);
        qb.where("createdAt", "<", cursor.createdAt);
      }

      // creatorUid
      if (opt.creatorUid) {
        qb.where("creatorUid", opt.creatorUid);
      }

      // buyerUid
      if (opt.buyerUid) {
        qb.where("buyerUid", opt.buyerUid);
      }

      lookupBuilder(select, opt);
    }
  });

  if (fetched.length >= limit) {
    const lastItem = fetched[fetched.length - 1];
    nextCursor = getNextCursor(lastItem);
  }

  if (opt.$numData && fetched.length > 0) {
    numData = (fetched[0] as any).numData;
  }

  return { data: fetched, nextCursor, numData };
}