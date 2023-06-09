import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InsertApplicationDTO, UpdateApplicationDTO } from './dto';

@Injectable()
export class ApplicationService {
  constructor(private prismaService: PrismaService) {}
  async getAllApplications(userId: number) {
    const applicationList = await this.prismaService.application.findMany({
      where: {
        employeeId: userId,
      },
      select: {
        content: true,
        createdAt: true,
        id: true,
        postJobId: true,
        status: true,
        postJob: {
          select: {
            work: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return {
      statusCode: 200,
      data: applicationList,
    };
  }
  async postApplication(
    userId: number,
    insertApplicationDTO: InsertApplicationDTO,
  ) {
    try {
      const postjob = await this.prismaService.postJob.findUnique({
        where: {
          id: insertApplicationDTO.postJobId,
        },
      });

      if (!postjob) {
        throw new NotFoundException('error');
      }

      const response = await this.prismaService.application.create({
        data: {
          content: insertApplicationDTO.content,
          postJobId: insertApplicationDTO.postJobId,
          employeeId: userId,
          status: 'PROCESSING',
        },
      });

      return {
        statusCode: 200,
        data: response,
        message: 'success',
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
  async updateApplication(
    ApplicationId: number,
    updateApplicationDTO: UpdateApplicationDTO,
  ) {
    const data = await this.prismaService.application.update({
      where: {
        id: ApplicationId,
      },
      data: {
        content: updateApplicationDTO.content,
        status: updateApplicationDTO.status,
      },
    });

    return {
      statusCode: 200,
      data,
    };
  }
  async deleteApplication(ApplicationId: number) {}
}
