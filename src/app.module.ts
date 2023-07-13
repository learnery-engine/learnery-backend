import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import * as Joi from 'joi'
import { UserModule } from './user/user.module'
import { CacheModule } from '@nestjs/cache-manager'

let mode = process.env.MODE
let envFile=".env"

switch (mode){
  case "test":
    envFile=".env.test"
    break
  case "prod":
    envFile = ".env.prod"
    break
  default:
    mode = "dev"
    envFile=".env.local"
}


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [envFile, '.env.local', '.env.test', '.env.prod', '.env'],
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        MODE: Joi.string().valid('dev', 'prod', 'test').default('dev'),
        PORT: Joi.number().default(1606),
        DATABASE_URL: Joi.string(),
        JWT_SECRET: Joi.string(),
      }),
    }),
    CacheModule.register({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
