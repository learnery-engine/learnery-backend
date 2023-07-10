import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthDto } from "./dto";
import * as pactum from "pactum";
import { HttpStatus } from "@nestjs/common";
import { expect, spec } from "pactum";
import { PrismaService } from "../prisma/prisma.service";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthModule } from "./auth.module";
import { ConfigModule, ConfigService } from "@nestjs/config";

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule,AuthModule,ConfigModule],
      providers: [ConfigService,AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });


  const dto: AuthDto = {
    email: "hiro_tests_auth_unnittest@gmail.com",
    password: "testing@rQfAPjfVsreWGz2",
  }
  describe("Sign up", () => {
    it("should signup", async () => {
      const res = await service.signup(dto)
      // jest.spyOn(service, 'signup').mockImplementation(() => result);
      // expect(res.email).toBe(dto.email)
      console.log(res.email)

      // expect(res.email).toBe(dto.email)
    })

    // it("should throw if email empty", () => {
    //   return pactum
    //     .spec()
    //     .post("/auth/signup")
    //     .withBody({
    //       password: dto.password,
    //     })
    //     .expectStatus(400)
    //     .inspect()
    // })
    //
    // it("should throw if password empty", () => {
    //   return pactum
    //     .spec()
    //     .post("/auth/signup")
    //     .withBody({
    //       email: dto.email,
    //     })
    //     .expectStatus(400)
    //     .inspect()
    // })
    //
    // it("should throw if not strang  password", () => {
    //   return pactum
    //     .spec()
    //     .post("/auth/signup")
    //     .withBody({
    //       email: dto.email,
    //       password: "123",
    //     })
    //     .expectStatus(400)
    //     .inspect()
    // })
  })
  describe("Sign in", () => {
    it("should throw if password empty", () => {
      return pactum
        .spec()
        .post("/auth/signin")
        .withBody({
          email: dto.email,
        })
        .expectStatus(400)
        .inspect()
    })
    it("should throw if email empty", () => {
      return pactum
        .spec()
        .post("/auth/signin")
        .withBody({
          password: dto.password,
        })
        .expectStatus(400)
        .inspect()
    })
    it("should signin", () => {
      return pactum.spec().post("/auth/signin").withBody(dto).expectStatus(200).stores("userToken", "access_token")
    })
  })
});
