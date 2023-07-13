import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaService } from './prisma/prisma.service'
import { ConfigModule } from '@nestjs/config'
import { CacheModule } from '@nestjs/cache-manager'

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), CacheModule.register()],
      controllers: [AppController],
      providers: [AppService, PrismaService],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('root', () => {
    it('should return {message: "app is up and running"}', () => {
      const res = appController.getHello()
      expect(res).toEqual({ message: 'app is up and running' })
    })

    it('should return status of services', async () => {
      const healthCheck = await appController.getHealth()
      expect(healthCheck).toHaveProperty('app')
      expect(healthCheck).toHaveProperty('db')
    })
  })
})
