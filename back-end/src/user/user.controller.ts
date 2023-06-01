import {
  Controller,
  Get,
  Req,
  UseGuards,
  Request,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { MyJwtGuard } from '../auth/guard';
import { UserService } from './user.service';
import { UserDTO } from './dto';
@UseGuards(MyJwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  me(@Req() req: Request) {
    return (req as any).user;
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.getUser(userId);
  }

  @Patch('update')
  updateUser(@Body() data: UserDTO, @GetUser('id') userId: number) {
    return this.userService.updateUser(userId, data);
  }

  @Patch('change-password')
  resetPassword(@Body() data: any, @GetUser('id') userId: number) {
    return this.userService.changePassword(userId, data);
  }

  // @UseGuards(MyJwtGuard)
  // // @Roles(Role.ADMIN, Role.USER)
  // @Get('allUsers')
  // getUsers(@Req() req: Request) {
  //   console.log((req as any).user);

  //   return this.userService.getUsers();
  // }
}
