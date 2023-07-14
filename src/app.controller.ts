import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { AppService } from './app.service'
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager'

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @CacheKey('home')
  @CacheTTL(Number.MAX_SAFE_INTEGER) //default is just 1 sec
  getHello() {
    return this.appService.getHello()
  }

  @CacheTTL(5 * 1000)
  @Get('health')
  getHealth() {
    return this.appService.getHealth()
  }
}
