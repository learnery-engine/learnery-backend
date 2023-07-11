import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  const config = app.get<ConfigService>(ConfigService)
  // app.enableShutdownHooks()

  const port = config.get('port') || 1606
  console.log(`App is running on ${port}`)
  app.use(cookieParser(config.get('JWT_TOKEN')))
  await app.listen(port)
}
bootstrap();
