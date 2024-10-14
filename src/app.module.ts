import { Module, type MiddlewareConsumer } from "@nestjs/common";
import { ZodValidationPipe } from "nestjs-zod";
import { APP_PIPE } from "@nestjs/core";

import { AuthMiddleware } from "@/apis/$tools/middlewares";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ScheduleModule } from "@nestjs/schedule";


// api modules
import { AdminModule } from "@/apis/Admin/module";
import { BidRequestModule } from "@/apis/BidRequest/module";
import { BidRequestMessageModule } from "@/apis/BidRequestMessage/module";
import { BidRoundModule } from "@/apis/BidRound/module";
import { BuyerModule } from "@/apis/Buyer/module";
import { CreatorModule } from "@/apis/Creator/module";
import { GenreModule } from "@/apis/Genre/module";
import { InvoiceModule } from "@/apis/Invoice/module";
import { NotificationModule } from "@/apis/Notification/module";
import { TokenModule } from "@/apis/Token/module";
import { UserModule } from "@/apis/User/module";
import { WebtoonModule } from "@/apis/Webtoon/module";
import { WebtoonEpisodeModule } from "@/apis/WebtoonEpisode/module";
import { WebtoonEpisodeImageModule } from "@/apis/WebtoonEpisodeImage/module";
import { WebtoonLikeModule } from "@/apis/WebtoonLike/module";
import { XWebtoonGenreModule } from "@/apis/XWebtoonGenre/module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    // api modules
    AdminModule,
    BidRequestModule,
    BidRequestMessageModule,
    BidRoundModule,
    BuyerModule,
    CreatorModule,
    GenreModule,
    InvoiceModule,
    NotificationModule,
    TokenModule,
    UserModule,
    WebtoonModule,
    WebtoonEpisodeModule,
    WebtoonEpisodeImageModule,
    WebtoonLikeModule,
    XWebtoonGenreModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_PIPE, useClass: ZodValidationPipe }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
      .forRoutes("*");
  }
}
