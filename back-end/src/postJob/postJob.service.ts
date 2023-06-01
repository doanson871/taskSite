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
          userId: userId,
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

  async getAllPostJobsByEmployee() {
    try {
      const postJobs = await this.prismaService.postJob.findMany({
        where: {
          status: true,
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
              content: true,
              employee: {
                select: {
                  photoURL: true,
                  name: true,
                  id: true,
                },
              },
              createdAt: true,
            },
          },
          createdAt: true,
          descrition: true,
          userId: true,
          user: true,
          workId: true,
          work: true,
          photoURL: true,
          quanhuyen: true,
          salary: true,
          status: true,
          thanhpho: true,
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

  async searchPostJobByUser(data: SearchPostJobDTO, userId: number) {
    const postJobSearch = await this.prismaService.postJob.findMany({
      where: {
        thanhpho: data.thanhpho
          ? data.thanhpho
          : {
              gte: '',
            },
        quanhuyen: data.quanhuyen
          ? data.quanhuyen
          : {
              gte: '',
            },
        workId: parseInt(data.workId)
          ? parseInt(data.workId)
          : {
              gt: 0,
            },
        salary: {
          gte: parseInt(data.salary) ? parseInt(data.salary) : 0,
        },
        // work: {
        //   name: data.workName
        //     ? data.workName
        //     : {
        //         gt: '',
        //       },
        // },
        userId: userId,
      },
      select: {
        id: true,
        address: true,
        descrition: true,
        createdAt: true,
        photoURL: true,
        quanhuyen: true,
        salary: true,
        status: true,
        thanhpho: true,
        userId: true,
        user: {
          select: {
            id: true,
            name: true,
            photoURL: true,
          },
        },
        work: true,
        workId: true,
      },
    });

    return {
      statusCode: 200,
      data: postJobSearch,
    };
  }

  async searchPostJobByEmployee(data: SearchPostJobDTO) {
    const postJobSearch = await this.prismaService.postJob.findMany({
      where: {
        thanhpho: data.thanhpho
          ? data.thanhpho
          : {
              gte: '',
            },
        quanhuyen: data.quanhuyen
          ? data.quanhuyen
          : {
              gte: '',
            },
        workId: parseInt(data.workId)
          ? parseInt(data.workId)
          : {
              gt: 0,
            },
        salary: {
          gte: parseInt(data.salary) ? parseInt(data.salary) : 0,
        },
        // work: {
        //   name: data.workName
        //     ? data.workName
        //     : {
        //         gt: '',
        //       },
        // },
      },
      select: {
        id: true,
        address: true,
        descrition: true,
        createdAt: true,
        photoURL: true,
        quanhuyen: true,
        salary: true,
        status: true,
        thanhpho: true,
        userId: true,
        user: {
          select: {
            id: true,
            name: true,
            photoURL: true,
          },
        },
        work: true,
        workId: true,
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
        address: insertPostJobDTO.address,
        workId: insertPostJobDTO.workId,
        descrition: insertPostJobDTO.descrition,
        salary: insertPostJobDTO.salary,
        thanhpho: insertPostJobDTO.thanhpho ?? '',
        quanhuyen: insertPostJobDTO.quanhuyen ?? '',
        photoURL: insertPostJobDTO.photoURL ?? '',
      },
    });

    return {
      statusCode: 200,
      message: 'OK',
      data: postJob,
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
