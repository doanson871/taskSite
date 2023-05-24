import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConversationDTO } from './dto';

@Injectable()
export class ConversationService {
  constructor(private prismaService: PrismaService) {}

  // get list of conversations
  async getUsersInConversation(userId: number) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          Member: true,
        },
      });

      const listId: Array<number> = user.Member.map((member) => {
        return member.conversationId;
      });

      const members = await this.prismaService.member.findMany({
        where: {
          conversationId: {
            in: [...listId],
          },
          userId: {
            not: userId,
          },
        },
        select: {
          userId: true,
          conversationId: true,
          conversation: {
            select: {
              lastMessage: true,
            },
          },
        },
      });

      const users = await this.prismaService.user.findMany({
        where: {
          id: {
            in: members.map((member) => {
              return member.userId;
            }),
          },
        },
        select: {
          name: true,
          id: true,
          photoURL: true,
        },
      });

      const data = [];

      for (let i = 0; i < users.length; i++) {
        data.push({
          conversationId: members[i].conversationId,
          user: users[i],
        });
      }

      return {
        statusCode: 200,
        members: data,
      };
    } catch (error) {
      return {
        statusCode: 404,
        error: error,
      };
    }
  }
  async getConversationMessages(conversationId: number) {
    try {
      const message = await this.prismaService.conversation.findUnique({
        where: {
          id: conversationId,
        },
        select: {
          Message: true,
        },
      });

      return {
        statusCode: 200,
        data: message,
      };
    } catch (error) {
      return {
        statusCode: 404,
        error: error,
      };
    }
  }

  async createConversation(userId: number, data: ConversationDTO) {
    if (userId === data.userId) {
      throw new ConflictException('duplicate user');
    }

    try {
      const members = await this.prismaService.member.findMany({
        where: {
          userId: userId,
        },
      });

      const otherMember = await this.prismaService.member.findFirst({
        where: {
          conversationId: {
            in: [...members.map((c) => c.conversationId)],
          },
          userId: data.userId,
        },
      });

      if (otherMember) {
        throw new ConflictException('duplicate');
      }

      const newConversation = await this.prismaService.conversation.create({
        data: {
          lastMessage: '',
        },
      });

      await this.prismaService.member.create({
        data: {
          conversationId: newConversation.id,
          userId: userId,
        },
      });

      await this.prismaService.member.create({
        data: {
          conversationId: newConversation.id,
          userId: data.userId,
        },
      });

      return {
        statusCode: 200,
        message: 'success',
      };
    } catch (error) {
      return {
        statusCode: 404,
        error,
      };
    }
  }
}
