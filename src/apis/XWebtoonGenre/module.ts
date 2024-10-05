import { Module } from "@nestjs/common";
import { XWebtoonGenreController } from "./controller";
import { XWebtoonGenreService } from "./service";

@Module({
  controllers: [XWebtoonGenreController],
  providers: [XWebtoonGenreService],
})
export class XWebtoonGenreModule {}
