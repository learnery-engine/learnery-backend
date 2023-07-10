import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get<ConfigService>(ConfigService).get("port")
  console.log(`App is running on ${port}`)
  await app.listen(port)
}
bootstrap();
