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
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { MyJwtGuard } from 'src/auth/guard';
import { UsersOnWorkservice } from './users-on-work.service';
import { InsertUserOnWorkDTO, UpdateUserOnWorkDTO } from './dto';

@UseGuards(MyJwtGuard)
@Controller('users-on-work')
export class UsersOnWorkController {
  constructor(private userOnWorkService: UsersOnWorkservice) {}

  @Get('/allUserOnWorksById')
  getAllUserOnWorksById(@GetUser('id') userId: number) {
    return this.userOnWorkService.getAllUserOnWorksById(userId);
  }

  @Get('/allUserOnWorks')
  getAllUserOnWorks() {
    return this.userOnWorkService.getAllUserOnWorks();
  }

  @Post('postUserOnWork')
  postUserOnWork(
    @GetUser('id') userId: number,
    @Body() insertUserOnWorkDTO: InsertUserOnWorkDTO,
  ) {
    return this.userOnWorkService.postUserOnWork(userId, insertUserOnWorkDTO);
  }

  @Patch(':id')
  updateUserOnWork(
    @Param('id', ParseIntPipe) UserOnWorkId: number,
    @Body() updateUserOnWorkDTO: UpdateUserOnWorkDTO,
  ) {
    return this.userOnWorkService.updateUserOnWork(
      UserOnWorkId,
      updateUserOnWorkDTO,
    );
  }

  @Delete(':id')
  deleteUserOnWork(@Param('id', ParseIntPipe) UserOnWorkId: number) {
    return this.userOnWorkService.deleteUserOnWork(UserOnWorkId);
  }
}
