import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import * as Joi from "joi";
import { string } from "joi";

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
    envFilePath: [".env-local", ".env"],
    isGlobal: true,
    cache: true,
    validationSchema: Joi.object({
      MODE: Joi.string().valid("development", "production", "testing").default("development"),
      PORT: Joi.number().default(1606),
      JWT_SECRET: Joi.string()
    }),
  }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
