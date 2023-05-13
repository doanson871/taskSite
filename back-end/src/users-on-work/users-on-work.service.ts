import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InsertUserOnWorkDTO, UpdateUserOnWorkDTO } from './dto';

@Injectable()
export class UsersOnWorkservice {
  constructor(private prismaService: PrismaService) {}
  async getAllUserOnWorks(userId: number) {}
  async postUserOnWork(
    userId: number,
    insertUserOnWorkDTO: InsertUserOnWorkDTO,
  ) {}
  async updateUserOnWork(
    UserOnWorkId: number,
    updateUserOnWorkDTO: UpdateUserOnWorkDTO,
  ) {}
  async deleteUserOnWork(UserOnWorkId: number) {}
}
