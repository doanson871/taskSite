import { ForbiddenException, OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { InsertMessageDto } from 'src/message/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class MyGateWay implements OnModuleInit {
  constructor(private prismaService: PrismaService) {}
  id: string;

  @WebSocketServer()
  server: Server;

  socket: any;

  onModuleInit() {
    this.server?.on('connection', (socket) => {
      console.log(socket.id);
      this.socket = socket;
      this.id = socket.id;
    });
  }

  @SubscribeMessage('newMessage')
  async onNewMessage(@MessageBody() body: any) {
    const data = await this.postMessage(body.message.userId, {
      content: body.message.content,
      conversationId: body.conversationId,
    });

    if (data.statusCode === 404) return;
    // console.log(data.statusCode === 404 ) return;

    this.server.emit(`onMessageRoom${body.conversationId}`, {
      id: this.id,
      data: body,
    });

    this.server.emit(`onLastMessageRoom${body.conversationId}`, {
      data: body,
    });
  }

  async postMessage(userId: number, insertMessageDTO: InsertMessageDto) {
    console.log(userId, insertMessageDTO);

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

      await this.prismaService.conversation.update({
        where: {
          id: insertMessageDTO.conversationId,
        },
        data: {
          lastMessage: insertMessageDTO.content,
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

  @SubscribeMessage('newNotification')
  onNewNotification(@MessageBody() body: any) {
    console.log(body);
  }
}
