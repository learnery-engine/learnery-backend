import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import * as Joi from "joi";

@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath: [".env-local", ".env"],
    isGlobal: true,
    cache: true,
    validationSchema: Joi.object({
      MODE: Joi.string().valid("development", "production", "testing").default("development"),
      PORT: Joi.number().default(1606),
    }),
  }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
