import { Module } from "@nestjs/common";
import { BuyerController } from "./controller";
import { BuyerService } from "./service";

@Module({
  controllers: [BuyerController],
  providers: [BuyerService],
})
export class BuyerModule {}
