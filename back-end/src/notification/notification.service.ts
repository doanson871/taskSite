import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createNotificationDTO } from './dto';

@Injectable()
export class NotificationService {
  constructor(private prismaService: PrismaService) {}
  async getAllNotifications(userId: number) {
    try {
      const notifications = await this.prismaService.notification.findMany({
        where: {
          receiverId: userId,
        },
        select: {
          content: true,
          createdAt: true,
          id: true,
          sender: {
            select: {
              photoURL: true,
              name: true,
            },
          },
          postId: true,
          isRead: true,
        },
      });

      return {
        statusCode: 200,
        data: notifications,
      };
    } catch (error) {
      throw new ForbiddenException('error');
    }
  }
  async createNoti(data: createNotificationDTO, senderId: number) {
    try {
      await this.prismaService.notification.create({
        data: {
          content: data.content,
          receiverId: data.reciverId,
          postId: data.postId,
          senderId: senderId,
        },
      });

      return {
        statusCode: 200,
        message: 'success',
      };
    } catch (error) {
      return new ForbiddenException('error');
    }
  }

  async updateNoti(notiId: number) {
    const noti = await this.prismaService.notification.update({
      where: {
        id: notiId,
      },
      data: {
        isRead: true,
      },
    });

    return {
      statusCode: 200,
      message: 'success',
    };
  }
}
