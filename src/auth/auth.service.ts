import { ForbiddenException, Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { AuthDto } from "./dto"
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from "@prisma/client/runtime"
import * as argon from "argon2"
import { JwtService } from "@nestjs/jwt"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password)

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hash,
        },
        select: {
          //FIXME: use transformers
          id: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      })
      return user
    } catch (error) {
      console.error({
        code: error.code,
        error,
      })
      if (error instanceof PrismaClientKnownRequestError || PrismaClientUnknownRequestError) {
        if (error.code == "P2002") {
          throw new ForbiddenException("credentials taken")
        }
      }
      throw error
    }
  }

  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    })

    if (!user) throw new ForbiddenException("incorrect credentials")

    const pwMatches = await argon.verify(user.hash, dto.password)

    if (!pwMatches) throw new ForbiddenException("invalid credentials")

    return this.signToken(user.id, user.email)
  }

  async signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    }
    const secret = this.config.get("JWT_SECRET")

    return {
      access_token: await this.jwt.signAsync(payload, {
        expiresIn: "1hr",
        secret: secret,
      }),
    }
  }
}
