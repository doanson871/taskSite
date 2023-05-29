import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InsertApplicationDTO, UpdateApplicationDTO } from './dto';

@Injectable()
export class ApplicationService {
  constructor(private prismaService: PrismaService) {}
  async getAllApplications(userId: number) {}
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

      await this.prismaService.application.create({
        data: {
          content: insertApplicationDTO.content,
          postJobId: insertApplicationDTO.postJobId,
          employeeId: userId,
          status: false,
        },
      });

      return {
        statusCode: 200,
        message: 'success',
      };
    } catch (error) {
      throw new NotFoundException('error');
    }
  }
  async updateApplication(
    ApplicationId: number,
    updateApplicationDTO: UpdateApplicationDTO,
  ) {}
  async deleteApplication(ApplicationId: number) {}
}
