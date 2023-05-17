import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { MyJwtGuard } from 'src/auth/guard';
import { MessageService } from './message.service';
import { InsertMessageDto } from './dto';

@Controller('message')
@UseGuards(MyJwtGuard)
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post()
  postMessage(
    @GetUser('id') userId: number,
    @Body() insertMessageDTO: InsertMessageDto,
  ) {
    return this.messageService.postMessage(userId, insertMessageDTO);
  }
}
