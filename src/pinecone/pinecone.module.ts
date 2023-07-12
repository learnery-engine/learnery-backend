import { Module } from '@nestjs/common'
import { PineconeService } from './pinecone.service'

@Module({
  providers: [PineconeService],
})
export class PineconeModule {}
