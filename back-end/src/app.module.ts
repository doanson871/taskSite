import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NoteModule } from './note/note.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ContactModule } from './contract/contract.module';
import { WorkModule } from './work/work.module';
import { UsersOnWorkModule } from './users-on-work/users-on-work.module';
import { ApplicationModule } from './application/application.module';
import { PostJobModule } from './postJob/postJob.module';
import { GatewayModule } from './gateway/gateway.module';
import { MessageModule } from './message/message.module';
import { ConversationModule } from './conversation/conversation.module';
import { MemberModule } from './member/member.module';
@Module({
  imports: [
    ConfigModule,
    AuthModule,
    UserModule,
    NoteModule,
    PrismaModule,
    ContactModule,
    WorkModule,
    UsersOnWorkModule,
    ApplicationModule,
    PostJobModule,
    GatewayModule,
    MessageModule,
    ConversationModule,
    MemberModule,
  ],
  providers: [],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   // throw new Error('Method not implemented.');
  // }
}
