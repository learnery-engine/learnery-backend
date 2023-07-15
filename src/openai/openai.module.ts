import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { OpenaiService } from './openai.service'


@Module({
  imports: [ConfigModule],
  providers: [OpenaiService],
})
export class OpenaiModule {}
