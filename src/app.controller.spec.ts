import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from "./prisma/prisma.service";

describe('AppController', () => {
  let appController: AppController;


  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, PrismaService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return {message: "app is up and running"}', () => {
      expect(appController.getHello()).toBe({message: "app is up and running"});
    });

  });
});
