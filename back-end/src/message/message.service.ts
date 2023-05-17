import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InsertMessageDto } from './dto';

@Injectable()
export class MessageService {
  constructor(private prismaService: PrismaService) {}

  async postMessage(userId: number, insertMessageDTO: InsertMessageDto) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new ForbiddenException('Can not find user');
      }
      const conversation = await this.prismaService.conversation.findUnique({
        where: {
          id: insertMessageDTO.conversationId,
        },
      });

      if (!conversation) {
        throw new ForbiddenException('Can not find conversation');
      }

      const message = await this.prismaService.message.create({
        data: {
          userId: userId,
          ...insertMessageDTO,
        },
      });

      if (message)
        return {
          statusCode: 200,
          message: 'success',
        };
    } catch (error) {
      return {
        statusCode: 404,
        message: error.message,
      };
    }
  }
}
