import { Module } from "@nestjs/common";
import { BidRequestMessageController } from "./controller";
import { BidRequestMessageService } from "./service";
import { BidRequestService } from "../BidRequest/service";

@Module({
  controllers: [BidRequestMessageController],
  providers: [BidRequestMessageService, BidRequestService],
})
export class BidRequestMessageModule {}
