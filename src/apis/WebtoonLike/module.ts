import { Module } from "@nestjs/common";
import { WebtoonLikeController } from "./controller";
import { WebtoonLikeService } from "./service";
import { WebtoonService } from "../Webtoon/service";

@Module({
  controllers: [WebtoonLikeController],
  providers: [WebtoonLikeService, WebtoonService],
})
export class WebtoonLikeModule {}
