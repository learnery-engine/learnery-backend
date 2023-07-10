import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator"

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsStrongPassword()
  @IsNotEmpty()
  password: string
}
