import { Module } from '@nestjs/common';
import { UsersOnWorkservice } from './users-on-work.service';
import { UsersOnWorkController } from './users-on-work.controller';

@Module({
  providers: [UsersOnWorkservice],
  controllers: [UsersOnWorkController],
})
export class UsersOnWorkModule {}
