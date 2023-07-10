import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { EditUserDto } from "./dto"

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(userId: number, dto: EditUserDto) {
    console.log({ userId, dto })
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    })

    delete user.hash
    return user
  }

  async deleteUser(userId: number) {
    const user = await this.prisma.user.delete({
      where: {
        id: userId,
      },
    })

    delete user.hash
    return user
  }
}
