import { Injectable } from "@nestjs/common"
import { PrismaClient } from "@prisma/client"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    const sslcert = "?sslcert=root.crt"
    //https://www.prisma.io/docs/concepts/database-connectors/postgresql#configuring-an-ssl-connection
    super({
      datasources: {
        db: {
          url: config.get<string>("DATABASE_URL") + sslcert,
        },
      },
    })
  }

  cleanDb() {
    return this.$transaction([
      //tear down logic
      this.user.deleteMany(),
    ])
  }
}
