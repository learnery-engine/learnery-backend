import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import * as Joi from 'joi'
import { UserModule } from './user/user.module'
import { OpenaiModule } from './openai/openai.module'
import { PineconeModule } from './pinecone/pinecone.module'

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
    PrismaModule,
    ConfigModule.forRoot({
    envFilePath: [envFile,".env.local", ".env.test",".env.prod",".env"],
    isGlobal: true,
    cache: true,
    validationSchema: Joi.object({
      MODE: Joi.string().valid("dev", "prod", "test").default("dev"),
      PORT: Joi.number().default(1606),
      JWT_SECRET: Joi.string(),
      OPENAI_API_KEY: Joi.string().default(""), //FIXME
      PINECONE_API_ENV: Joi.string().default(""), //FIXME
      PINECONE_API_KEY: Joi.string().default(""),//FIXME
    }),
  }),
    AuthModule,
    UserModule,
    OpenaiModule,
    PineconeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
