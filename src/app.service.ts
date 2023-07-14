import { Injectable } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'

class ServiceStatus {
  constructor(public ok: boolean = true, public status: string = 'OK', public debug: any = undefined) {}
}

@Injectable()
export class AppService {

  constructor(private prisma:PrismaService) {
  }
  getHello() {
    return {message: "app is up and running"};
  }


  async getHealth(){
    let dbStatus = new ServiceStatus()

    await this.prisma.$connect().
    then(()=>{
      console.count("db connected successfully")
    }).
    catch((err)=>{
      console.error({prisma:`connection failed due to ${err}`})
      dbStatus.ok = false
      dbStatus.status = "connection failed"
      dbStatus.debug = err
    })
    return {
      db: dbStatus,
      app: new ServiceStatus(),
    }
  }
}
