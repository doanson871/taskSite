import { Module } from '@nestjs/common';
import { PostJobController } from './postJob.controller';
import { PostJobService } from './postJob.service';

@Module({
  controllers: [PostJobController],
  providers: [PostJobService],
})
export class PostJobModule {}
