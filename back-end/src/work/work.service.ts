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
        { name: 'rua bat' },
        { name: 'lai xe' },
        { name: 'trong tre' },
        { name: 'quet nha' },
        { name: 'xay dung' },
        { name: 'son tuong' },
        { name: 'shipper' },
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
