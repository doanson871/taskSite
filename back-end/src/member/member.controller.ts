import {
  Controller,
  UseGuards,
  Patch,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { MyJwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';

@UseGuards(MyJwtGuard)
@Controller('member')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Patch(':id')
  updateMember(
    @Param('id', ParseIntPipe) conversationId: number,
    @GetUser('id') userId: number,
    @Body() data: any,
  ) {
    return this.memberService.updateMember(conversationId, userId, data);
  }
}
