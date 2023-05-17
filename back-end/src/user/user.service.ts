import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDTO } from './dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUser(userId: number) {}

  async getUsers() {
    const users = await this.prismaService.user.findMany({
      where: {},
    });

    return users;
  }

  async updateUser(userId: number, data: UserDTO) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new ForbiddenException('Could not find user');
      }

      const newUser = await this.prismaService.user.update({
        where: {
          id: userId,
        },
        data: {
          ...data,
        },
      });

      if (!newUser) {
        throw new ForbiddenException('Could not update user');
      }

      return {
        statusCode: 200,
        message: 'success',
      };
    } catch (error) {
      return {
        statsuCode: 404,
        message: 'Not Found',
      };
    }
  }
}
