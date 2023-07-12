import { Injectable } from '@nestjs/common'

@Injectable()
export class PineconeService {
  constructor() {}

  healthCheck() {
    //TODO: add this to /health service
  }

  createIndex() {
    //   TODO: check if exits
  }

  deleteIndex() {
    //   TODO:
  }

  similaritySearch(text: string, k: number = 6) {
    //   TODO:
  }
}
