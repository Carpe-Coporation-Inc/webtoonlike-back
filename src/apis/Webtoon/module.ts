import { Module } from "@nestjs/common";
import { WebtoonController } from "./controller";
import { WebtoonService } from "./service";

@Module({
  controllers: [WebtoonController],
  providers: [WebtoonService],
})
export class WebtoonModule {}
