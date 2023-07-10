import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { ConfigService } from "@nestjs/config"
import { PrismaService } from "../../prisma/prisma.service"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  private jwtConstants: any

  constructor(private config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get("JWT_SECRET"),
    })
  }

  validate(payload: { sub: number; email: string }) {
    const user = this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    })
    if (!user) return null //throws the 401 error

    return { userId: payload.sub, email: payload.email }
    // whatever is returned is appended to req.user
  }
}
