import { z } from "zod";
import { baseModelSchema, insertFormSchema, getOptionSchema, listOptionSchema } from "../$commons/schema";
import { TG } from "@/utils/type_generator";


export const notificationTypeEnum = z.enum([
  "roundAdminAccepted", "roundAdminRejected",
  "requestReceived", "requestAccepted", "requestRejected",
  "invoicePublished",
]);


export const notificationFormSchema = insertFormSchema.extend({
  userId: z.number().int(),
  type: notificationTypeEnum,
  message: z.string(),
  isRead: z.boolean(),
  arg: z.any()
});

export const notificationSchema = baseModelSchema.extend({
  ...notificationFormSchema.shape
});

export const getNotificationOptionSchema = getOptionSchema.extend({}).partial();
export const listNotificationOptionSchema = listOptionSchema.extend({
  ...getNotificationOptionSchema.shape,
  userId: z.coerce.number().int(),
}).partial();


const tgKey = "Notification";

TG.add(tgKey, "NotificationFormT", notificationFormSchema);
TG.add(tgKey, "NotificationT", notificationSchema);

TG.add(tgKey, "GetNotificationOptionT", getNotificationOptionSchema);
TG.add(tgKey, "ListNotificationOptionT", listNotificationOptionSchema);

