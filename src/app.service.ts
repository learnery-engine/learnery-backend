import { Injectable, UseInterceptors } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager'
import { sleep } from '../utils'

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

  @CacheKey('health')
  @CacheTTL(3*1000)
  @UseInterceptors(CacheInterceptor)
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
    await sleep(1000)
    return {
      db: dbStatus,
      app: new ServiceStatus(),
    }
  }
}
