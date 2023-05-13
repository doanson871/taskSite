import { Controller, Get, Req, UseGuards, Request } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { MyJwtGuard } from '../auth/guard';
import { UserService } from './user.service';
import { Roles } from 'src/utils/roleGuard/role.decorator';
import { Role } from 'src/utils/roleGuard/role.enum';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(MyJwtGuard)
  @Get('me')
  me(@Req() req: Request) {
    console.log((req as any).user);

    return (req as any).user;
  }

  @Get('notes')
  getNotes(@GetUser() user) {
    console.log(user);

    return this.userService.getNotes();
  }

  @UseGuards(MyJwtGuard)
  // @Roles(Role.ADMIN, Role.USER)
  @Get('allUsers')
  getUsers(@Req() req: Request) {
    console.log((req as any).user);

    return this.userService.getUsers();
  }
}
