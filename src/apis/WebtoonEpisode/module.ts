import { Module } from "@nestjs/common";
import { WebtoonEpisodeController } from "./controller";
import { WebtoonEpisodeService } from "./service";

@Module({
  controllers: [WebtoonEpisodeController],
  providers: [WebtoonEpisodeService],
})
export class WebtoonEpisodeModule {}
