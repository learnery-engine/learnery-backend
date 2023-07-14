import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'
import * as compression from 'compression'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  const config = app.get<ConfigService>(ConfigService)
  // app.enableShutdownHooks()

  app.use(cookieParser(config.get('JWT_SECRET')))
  app.enableCors()
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'Accept-Version',
  })

  app.use(
    compression({
      threshold: 512, // only responses exceeding 512 bytes will be compressed
    }),
  )

  const port = config.get('PORT') || 1606
  console.log(`App is running on ${port}`)

  await app.listen(port)
}
bootstrap();

