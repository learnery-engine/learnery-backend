import { Injectable } from '@nestjs/common'

@Injectable()
export class OpenaiService {
  constructor() {}

  healthCheck() {
    //TODO: add this to /health service
  }

  query(question: string) {
    //   TODO:
  }
}
