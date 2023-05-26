import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDTO } from './dto';
import * as argon from 'argon2';

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

  async changePassword(userId: number, data: any) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new ForbiddenException('Could not find user');
      }

      const passwordMatched = await argon.verify(
        user.hashedPassword,
        data.oldPassword,
      );

      if (!passwordMatched) {
        throw new BadRequestException('old password mismatch');
      }

      const newHashedPassword = await argon.hash(data.newPassword);

      await this.prismaService.user.update({
        where: {
          id: userId,
        },
        data: {
          hashedPassword: newHashedPassword,
        },
      });

      return {
        statusCode: 200,
        message: 'Password reset',
      };
    } catch (error) {
      throw new NotFoundException('Error');
    }
  }
}
