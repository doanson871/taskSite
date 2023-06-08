import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { insertWorkDTO } from './dto';

@Injectable()
export class WorkService {
  constructor(private prismaService: PrismaService) {}

  async getAllWork() {
    try {
      const works = await this.prismaService.work.findMany({});
      return works;
    } catch (error) {
      console.log(error);
    }
  }

  async getDetails(id: number) {
    try {
      const work = await this.prismaService.work.findUnique({
        where: { id: id },
        select: {
          id: true,
          user: true,
          name: true,
        },
      });

      if (!work) {
        throw new ForbiddenException(`Work not found`);
      }
      return {
        statusCode: 200,
        data: work,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async postWork(insertWorkDTO: insertWorkDTO) {
    try {
      const work = await this.prismaService.work.create({
        data: {
          name: insertWorkDTO.name,
        },
      });

      return {
        statusCode: 200,
        work: work,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async postWorkMany(insertWorkManyDTO: any) {
    const manyWork = await this.prismaService.work.createMany({
      data: [
        { name: 'dọn nhà' },
        { name: 'lái xe' },
        { name: 'trông trẻ' },
        { name: 'chăm sóc thú cưng' },
        { name: 'sửa chữa máy tính' },
        { name: 'sửa điều hòa' },
        { name: 'sửa xe máy' },
        { name: 'phụ bán hàng' },
        { name: 'bảo vệ' },
        { name: 'nhân viên sale' },
        { name: 'phát tờ rơi' },
        { name: 'gia sư' },
        { name: 'giúp việc' },
        ...insertWorkManyDTO.data,
      ],
    });

    return {
      statusCode: 200,
      message: 'success',
      data: manyWork,
    };
  }
}
