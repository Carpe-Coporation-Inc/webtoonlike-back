import { Module } from "@nestjs/common";
import { BidRequestController } from "./controller";
import { BidRequestService } from "./service";
import { InvoiceService } from "@/apis/Invoice/service";

@Module({
  controllers: [BidRequestController],
  providers: [BidRequestService, InvoiceService],
})
export class BidRequestModule {}
