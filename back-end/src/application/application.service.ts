import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InsertApplicationDTO, UpdateApplicationDTO } from './dto';

@Injectable()
export class ApplicationService {
  constructor(private prismaService: PrismaService) {}
  async getAllApplications(userId: number) {}
  async postApplication(
    userId: number,
    insertApplicationDTO: InsertApplicationDTO,
  ) {}
  async updateApplication(
    ApplicationId: number,
    updateApplicationDTO: UpdateApplicationDTO,
  ) {}
  async deleteApplication(ApplicationId: number) {}
}
