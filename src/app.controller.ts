import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { AppService } from './app.service'
import { CacheInterceptor } from '@nestjs/cache-manager'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  getHello() {
    return this.appService.getHello()
  }

  @Get('health')
  getHealth() {
    return this.appService.getHealth()
  }
}
