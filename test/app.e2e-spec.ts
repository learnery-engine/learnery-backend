import { Test } from "@nestjs/testing"
import { AppModule } from "../src/app.module"
import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common"
import * as pactum from "pactum"
import { ConfigService } from "@nestjs/config"

describe("App e2e", () => {
  let app: INestApplication

  let url: string
  beforeAll(async () => {
    const ModuleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    app = ModuleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    await app.init()
    const port = app.get(ConfigService).get("PORT")
    url = `http://localhost:${port}`
    await app.listen(port)
    pactum.request.setBaseUrl(url)
  })


  afterAll(async () => {
    await app.close()
  })

  describe("Auth", function () {
    describe("Sign up", () => {
      it.todo("sign up the user") //TODO:
    })
    describe("Sign in", () => {
      it.todo("sign the user") //TODO:
    })
  })

  describe("Course",()=>{
    it.todo("CRUD Courses") //TODO:
  })

})
