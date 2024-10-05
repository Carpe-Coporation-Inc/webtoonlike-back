import { notificationM } from "@/models/Notification";
import { encodeCursor, decodeCursor } from "@/utils/formatter";
import type { ListNotificationOptionT, NotificationT } from "@/types";


export async function listNotification(opt: ListNotificationOptionT): Promise<ListData<NotificationT>> {
  const table = notificationM.table;
  const limit = opt.limit ?? 30;
  let nextCursor: string|null = null;
  let getNextCursor: (item: NotificationT) => string|null = () => null;

  const fetched = await notificationM.find({
    builder: (qb) => {
      qb.limit(limit);

      // sort
      qb.orderBy("createdAt", "desc");
      getNextCursor = (item) => encodeCursor({ createdAt: item.createdAt });
      if (opt.cursor) {
        const cursor = decodeCursor(opt.cursor);
        qb.where("createdAt", "<", cursor.createdAt);
      }

      // userId
      if (opt.userId) {
        qb.where("userId", opt.userId);
      }
    }
  });


  if (fetched.length >= limit) {
    const lastItem = fetched[fetched.length - 1];
    nextCursor = getNextCursor(lastItem);
  }

  return {
    data: fetched,
    nextCursor
  };
}