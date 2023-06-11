import {
  Body,
  Controller,
  Patch,
  Post,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { MyJwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { createNotificationDTO } from './dto';

@UseGuards(MyJwtGuard)
@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Get()
  getAllNotifications(@GetUser('id') userId: number) {
    return this.notificationService.getAllNotifications(userId);
  }

  @Post()
  createNoti(
    @Body() data: createNotificationDTO,
    @GetUser('id') senderId: number,
  ) {
    return this.notificationService.createNoti(data, senderId);
  }

  @Patch(':id')
  updateNoti(@Param('id', ParseIntPipe) notiId: number) {
    return this.notificationService.updateNoti(notiId);
  }
}
