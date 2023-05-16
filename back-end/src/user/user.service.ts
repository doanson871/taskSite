import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  getUser(userId) {}

  async getUsers() {
    const users = await this.prismaService.user.findMany({
      where: {},
    });

    return users;
  }
}
