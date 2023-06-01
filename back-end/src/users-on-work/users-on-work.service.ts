import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InsertUserOnWorkDTO, UpdateUserOnWorkDTO } from './dto';

@Injectable()
export class UsersOnWorkservice {
  constructor(private prismaService: PrismaService) {}
  async getAllUserOnWorks(userId: number) {
    const data = await this.prismaService.usersOnWorks.findMany({
      where: {
        userId: userId,
      },
    });

    return {
      statusCode: 200,
      data,
    };
  }
  async postUserOnWork(
    userId: number,
    insertUserOnWorkDTO: InsertUserOnWorkDTO,
  ) {
    const data = await this.prismaService.usersOnWorks.create({
      data: {
        description: insertUserOnWorkDTO.description,
        photoURL: insertUserOnWorkDTO.photoURL,
        priceExpected: insertUserOnWorkDTO.priceExpected,
        userId: userId,
        workId: insertUserOnWorkDTO.workId,
      },
    });

    return {
      statusCode: 200,
      data: data,
    };
  }
  async updateUserOnWork(
    userOnWorkId: number,
    updateUserOnWorkDTO: UpdateUserOnWorkDTO,
  ) {
    await this.prismaService.usersOnWorks.update({
      where: {
        id: userOnWorkId,
      },
      data: {
        ...updateUserOnWorkDTO,
      },
    });

    return { statusCode: 200 };
  }
  async deleteUserOnWork(UserOnWorkId: number) {
    await this.prismaService.usersOnWorks.delete({
      where: {
        id: UserOnWorkId,
      },
    });
    return { statusCode: 200 };
  }
}
