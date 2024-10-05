import { creatorM } from "@/models/Creator";
import { encodeCursor, decodeCursor } from "@/utils/formatter";
import type { ListCreatorOptionT, CreatorT } from "@/types/Creator";
import { lookupBuilder } from "./lookup_builder";

export async function listCreator(opt: ListCreatorOptionT): Promise<ListData<CreatorT>> {
  const table = creatorM.table;
  const limit = opt.limit ?? 30;

  let nextCursor: string|null = null;
  let getNextCursor: (item: CreatorT) => string|null = () => null;

  const fetched = await creatorM.find({
    builder: (qb, select) => {
      qb.limit(limit);

      switch (opt.sort ?? "recent") {
      case "recent":
        qb.orderBy("id", "desc");
        getNextCursor = (item) => encodeCursor({ id: item.id });

        if (opt.cursor) {
          const cursor = decodeCursor(opt.cursor);
          qb.where(`${table}.id`, "<", cursor.id);
        }
        break;
      default:
        throw new Error("invalid sort option: " + opt.sort);
      }

      if (opt.exposed === "only") {
        qb.whereRaw(`"${table}"."isExposed" = true`);
      }

      // lookups
      lookupBuilder(select, opt);
    }
  });

  if (fetched.length >= limit) {
    const lastItem = fetched[fetched.length - 1];
    nextCursor = getNextCursor(lastItem);
  }

  return {
    data: fetched,
    nextCursor,
  };
}