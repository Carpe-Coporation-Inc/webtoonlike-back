import { Module } from "@nestjs/common";
import { WebtoonEpisodeImageController } from "./controller";
import { WebtoonEpisodeImageService } from "./service";

@Module({
  controllers: [WebtoonEpisodeImageController],
  providers: [WebtoonEpisodeImageService],
})
export class WebtoonEpisodeImageModule {}
