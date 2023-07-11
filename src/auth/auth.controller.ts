import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Res() res: Response, @Body() dto: AuthDto) {
    const token = await this.authService.signin(dto)

    /*res.cookie('user',res.id, {
      // Set cookie options here (e.g., expiration, domain, path, etc.)
      maxAge: 3600000, // Cookie expiration time in milliseconds (1 hour)
      httpOnly: true, // Cookie accessible only through HTTP(S) requests
      secure: true, // Cookie sent only over HTTPS if true
      signed: true,
    });*/

    res.cookie('jwt', token.access_token, {
      maxAge: 2 * 60 * 60,
      // httpOnly: true,
      secure: true,
      // signed: true,
    })

    return token
  }
}
