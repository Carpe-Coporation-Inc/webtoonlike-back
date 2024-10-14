import {
  Controller, Get, Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { User, UserId } from "@/apis/$tools/decorators";
import { UserGuard } from "@/apis/$tools/guards";
import {
  ListNotificationDto,
} from "./dtos";
import * as err from "@/errors";
import * as R from "@/types/Notification.api";
import { NotificationService } from "./service";
import type { UserT } from "@/types";


@Controller("notifications")
export class NotificationController {
  constructor(private readonly service: NotificationService) {}

  @UseGuards(UserGuard)
  @Get("/")
  async list(
    @UserId() userId: number,
    @Query() query: ListNotificationDto,
  ): Promise<R.ListRsp> {
    const getOpt = query satisfies R.ListRqs;
    if (getOpt.userId !== userId) {
      throw new err.InvalidDataE("userId not matching");
    }
    return await this.service.list(query);
  }

  @UseGuards(UserGuard)
  @Put("/check-all")
  async checkAll(
    @User() user: UserT,
  ): Promise<R.CheckAllRsp> {
    await this.service.checkAll(user.id);
    return true;
  }

}