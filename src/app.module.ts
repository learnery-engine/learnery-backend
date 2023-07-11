import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import * as Joi from 'joi'
import { UserModule } from './user/user.module'
import { KkController } from './kk/kk.controller'

let mode = process.env.MODE
let envFile=".env"

switch (mode){
  case "test":
    envFile=".env.test"
    break
  default:
    mode = "dev"
    envFile=".env.local"
}
@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
    envFilePath: [envFile,".env.local", ".env.test",".env.prod",".env"],
    isGlobal: true,
    cache: true,
    validationSchema: Joi.object({
      MODE: Joi.string().valid("development", "production", "testing").default("development"),
      PORT: Joi.number().default(1606),
      JWT_SECRET: Joi.string()
    }),
  }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController, KkController],
  providers: [AppService],
})
export class AppModule {}
