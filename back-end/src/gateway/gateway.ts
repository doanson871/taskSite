import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';

@WebSocketGateway()
export class MyGateWay implements OnModuleInit {
  constructor(private prismaService: PrismaService) {}
  id: string;

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      this.id = socket.id;
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('onMessage', {
      id: this.id,
      msg: body,
    });
  }

  @SubscribeMessage('newNotification')
  onNewNotification(@MessageBody() body: any) {}
}
