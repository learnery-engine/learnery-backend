import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  const port = app.get<ConfigService>(ConfigService).get("port")
  console.log(`App is running on ${port}`)
  await app.listen(port)
}
bootstrap();
