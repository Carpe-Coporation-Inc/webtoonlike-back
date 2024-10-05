import { Module } from "@nestjs/common";
import { InvoiceController } from "./controller";
import { InvoiceService } from "./service";

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
