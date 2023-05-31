import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { MyJwtGuard } from 'src/auth/guard';
import { WorkService } from './work.service';
import { insertWorkDTO } from './dto';
import { Roles } from 'src/utils/roleGuard/role.decorator';
import { Role } from 'src/utils/roleGuard/role.enum';

@UseGuards(MyJwtGuard)
@Controller('work')
export class WorkController {
  constructor(private workService: WorkService) {}

  @Get('/works')
  getAllWork() {
    return this.workService.getAllWork();
  }

  @Get('/:id/details')
  getDetails(@Param('id', ParseIntPipe) id: number) {
    return this.workService.getDetails(id);
  }

  // @Roles(Role.ADMIN)
  @Post()
  postWork(@Body() insertWorkDTO: insertWorkDTO) {
    return this.workService.postWork(insertWorkDTO);
  }

  @Post('many')
  postWorkMany(@Body() insertWorkManyDTO: any) {
    return this.workService.postWorkMany(insertWorkManyDTO);
  }
}
