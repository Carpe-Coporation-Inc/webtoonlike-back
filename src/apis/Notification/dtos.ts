import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
import { listNotificationOptionSchema } from "@/models/Notification";
// import { } from "@/types/_";


// list
export class ListNotificationDto extends createZodDto(listNotificationOptionSchema) {}

