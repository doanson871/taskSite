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
import { Roles } from 'src/utils/roleGuard/role.decorator';
import { Role } from 'src/utils/roleGuard/role.enum';
import { RolesGuard } from 'src/utils/roleGuard/roles.gurad';

@UseGuards(MyJwtGuard)
@Controller('postJob')
export class PostJobController {
  constructor(private postJobService: PostJobService) {}

  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  @Get('searchByUser')
  searchPostJobByUser(
    @Query() data: SearchPostJobDTO,
    @GetUser('id') userId: number,
  ) {
    const dataSearch: SearchPostJobDTO = {
      thanhpho: '',
      workId: undefined,
      // workName: '',
      quanhuyen: '',
      salary: 0,
      ...data,
    };

    return this.postJobService.searchPostJobByUser(dataSearch, userId);
  }

  @Roles(Role.EMPLOYEE)
  @UseGuards(RolesGuard)
  @Get('searchByEmployee')
  searchPostJobByEmployee(@Query() data: SearchPostJobDTO) {
    const dataSearch: SearchPostJobDTO = {
      thanhpho: '',
      workId: undefined,
      // workName: '',
      quanhuyen: '',
      salary: 0,
      ...data,
    };

    return this.postJobService.searchPostJobByEmployee(dataSearch);
  }

  @Get('infoPostJob')
  getTotalInfoPostJob() {
    return this.postJobService.getTotalInfoPostJob();
  }

  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  @Get('allPostJobs')
  getAllPostJobs(@GetUser('id') userId: number) {
    return this.postJobService.getAllPostJobs(userId);
  }

  @Roles(Role.EMPLOYEE)
  @UseGuards(RolesGuard)
  @Get('allPostJobsByEmployee')
  getAllPostJobsByEmployee() {
    return this.postJobService.getAllPostJobsByEmployee();
  }

  @Get(':id')
  getPostJob(@Param('id', ParseIntPipe) postJobId: number) {
    return this.postJobService.getPostJob(postJobId);
  }

  @Roles(Role.USER)
  @UseGuards(RolesGuard)
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
