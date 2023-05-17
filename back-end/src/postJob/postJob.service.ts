import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InsertPostJobDTO, SearchPostJobDTO, UpdatePostJobDTO } from './dto';

@Injectable()
export class PostJobService {
  constructor(private prismaService: PrismaService) {}
  async getAllPostJobs(userId: number) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return {
          status: 403,
          message: 'User not found',
        };
      }

      const postJobs = await this.prismaService.postJob.findMany({
        where: {
          id: userId,
        },
      });
      return {
        statusCode: 200,
        data: {
          postJobs: postJobs,
        },
      };
    } catch (error) {
      return error;
    }
  }
  async getPostJob(postJobId: number) {
    try {
      const postJob = await this.prismaService.postJob.findUnique({
        where: {
          id: postJobId,
        },
        select: {
          id: true,
          address: true,
          Application: {
            select: {
              id: true,
              employee: {
                select: {
                  id: true,
                  name: true,
                  photoURL: true,
                },
              },
              employeeId: true,
            },
          },
          createdAt: true,
          descrition: true,
          userId: true,
          user: true,
          workId: true,
          work: true,
          time: true,
        },
      });

      if (!postJob) {
        return {
          statusCode: 403,
          message: 'Did not find postJob',
        };
      }

      return {
        statusCode: 200,
        data: {
          postJob,
        },
      };
    } catch (error) {
      return error;
    }
  }

  async searchPostJob(data: SearchPostJobDTO) {
    const postJobSearch = await this.prismaService.postJob.findMany({
      where: {
        address: data.address
          ? data.address
          : {
              gt: '',
            },
        workId: data.workId
          ? parseInt(data.workId)
          : {
              gt: 0,
            },
        work: {
          name: data.name
            ? data.name
            : {
                gt: '',
              },
        },
      },
    });

    return {
      statusCode: 200,
      data: postJobSearch,
    };
  }

  async postPostJob(userId: number, insertPostJobDTO: InsertPostJobDTO) {
    const postJob = await this.prismaService.postJob.create({
      data: {
        userId: userId,
        time: insertPostJobDTO.time,
        address: insertPostJobDTO.address,
        workId: insertPostJobDTO.workId,
        descrition: insertPostJobDTO.descrition,
      },
    });

    return {
      statusCode: 200,
      message: 'OK',
    };
  }
  async updatePostJob(postJobId: number, updatePostJobDTO: UpdatePostJobDTO) {
    try {
      const postJob = await this.prismaService.postJob.findUnique({
        where: {
          id: postJobId,
        },
      });
      if (!postJob) {
        throw new ForbiddenException('Can not fine postJob to update');
      }
      return this.prismaService.postJob.update({
        where: {
          id: postJobId,
        },
        data: {
          ...updatePostJobDTO,
        },
      });
    } catch (error) {
      return error;
    }
  }
  async deletePostJob(postJobId: number) {
    const postJob = await this.prismaService.postJob.findUnique({
      where: {
        id: postJobId,
      },
    });

    if (!postJob) {
      throw new ForbiddenException('Can not fine postJob to delete');
    }

    return this.prismaService.postJob.delete({
      where: {
        id: postJobId,
      },
    });
  }
}
