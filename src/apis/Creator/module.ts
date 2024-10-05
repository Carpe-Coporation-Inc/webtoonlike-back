import { Module } from "@nestjs/common";
import { CreatorController } from "./controller";
import { CreatorService } from "./service";

@Module({
  controllers: [CreatorController],
  providers: [CreatorService],
})
export class CreatorModule {}
