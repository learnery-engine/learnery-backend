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
  async signin(@Body() dto: AuthDto, @Res() res: Response) {
    const token = await this.authService.signin(dto)

    /*    res.cookie('user', dto.email, { //TODO:
      // Set cookie options here (e.g., expiration, domain, path, etc.)
      maxAge: 3600000, // Cookie expiration time in milliseconds (1 hour)
      httpOnly: true, // Cookie accessible only through HTTP(S) requests
      secure: true, // Cookie sent only over HTTPS if true
      signed: true,
    })*/
    // const cookies = req.cookies; //TODO: middle ware to clear the cookies when signin
    // TODO: utility function to clear and set cookie
    // for (let cookieName in cookies) {
    //   res.clearCookie(cookieName); // Replace '.your-domain.com' with your actual domain
    // }
    res.clearCookie('token')
    res.cookie('token', token.access_token, {
      maxAge: 2 * 60 * 60,
      secure: true,
      httpOnly: true,
      // signed: true,
    })

    res.send(token)
  }
}

