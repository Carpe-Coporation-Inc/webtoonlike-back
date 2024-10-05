import { Module } from "@nestjs/common";
import { BidRoundController } from "./controller";
import { BidRoundService } from "./service";

@Module({
  controllers: [BidRoundController],
  providers: [BidRoundService],
})
export class BidRoundModule {}
