import { Module } from "@nestjs/common";
import { GenreController } from "./controller";
import { GenreService } from "./service";

@Module({
  controllers: [GenreController],
  providers: [GenreService],
})
export class GenreModule {}
