import { env } from "@/env";
import express from "express";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./apis/$tools/exception_filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.use(express.json({ limit: "10mb" }));

  app.enableCors({
    origin: true,
    credentials: true,
  });

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(env.PORT);
}


bootstrap();
