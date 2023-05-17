import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { MyJwtGuard } from 'src/auth/guard';
import { ConversationService } from './conversation.service';
import { ConversationDTO } from './dto';

@UseGuards(MyJwtGuard)
@Controller('conversation')
export class ConversationController {
  constructor(private conversationService: ConversationService) {}

  @Get()
  getUsersInConversation(@GetUser('id') userId: number) {
    return this.conversationService.getUsersInConversation(userId);
  }

  @Get(':id')
  getConversationMessages(@Param('id', ParseIntPipe) conversationId: number) {
    return this.conversationService.getConversationMessages(conversationId);
  }

  @Post()
  createConversation(
    @Body() data: ConversationDTO,
    @GetUser('id') userId: number,
  ) {
    return this.conversationService.createConversation(userId, data);
  }
}
