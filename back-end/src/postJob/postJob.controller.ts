import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
  Body,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { MyJwtGuard } from 'src/auth/guard';
import { PostJobService } from './postJob.service';
import { InsertPostJobDTO, SearchPostJobDTO, UpdatePostJobDTO } from './dto';

@UseGuards(MyJwtGuard)
@Controller('postJob')
export class PostJobController {
  constructor(private postJobService: PostJobService) {}

  @Get('/allPostJobs')
  getAllPostJobs(@GetUser('id') userId: number) {
    return this.postJobService.getAllPostJobs(userId);
  }

  @Get('/postJob/:id')
  getPostJob(@Param('id', ParseIntPipe) postJobId: number) {
    return this.postJobService.getPostJob(postJobId);
  }

  @Get('search')
  searchPostJob(@Query() data: SearchPostJobDTO) {
    console.log(data);
    const dataSearch: SearchPostJobDTO = {
      time: new Date().toISOString(),
      address: '',
      workId: undefined,
      ...data,
    };

    console.log(dataSearch);
    return this.postJobService.searchPostJob(dataSearch);
  }

  @Post()
  postPostJob(
    @GetUser('id') userId: number,
    @Body() insertPostJobDTO: InsertPostJobDTO,
  ) {
    return this.postJobService.postPostJob(userId, insertPostJobDTO);
  }

  @Patch(':id')
  updatePostJob(
    @Param('id', ParseIntPipe) postJobId: number,
    @Body() updatePostJobDTO: UpdatePostJobDTO,
  ) {
    return this.postJobService.updatePostJob(postJobId, updatePostJobDTO);
  }

  @Delete(':id')
  deletePostJob(@Param('id', ParseIntPipe) postJobId: number) {
    return this.postJobService.deletePostJob(postJobId);
  }
}
