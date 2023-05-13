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
import { ApplicationService } from './application.service';
import { InsertApplicationDTO, UpdateApplicationDTO } from './dto';

@Controller('application')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @Get('/allApplications')
  getAllApplications(@GetUser('id') userId: number) {
    return this.applicationService.getAllApplications(userId);
  }

  @Post('postApplication')
  postApplication(
    @GetUser('id') userId: number,
    @Body() insertApplicationDTO: InsertApplicationDTO,
  ) {
    return this.applicationService.postApplication(
      userId,
      insertApplicationDTO,
    );
  }

  @Patch(':id')
  updateApplication(
    @Param('id', ParseIntPipe) ApplicationId: number,
    @Body() updateApplicationDTO: UpdateApplicationDTO,
  ) {
    return this.applicationService.updateApplication(
      ApplicationId,
      updateApplicationDTO,
    );
  }

  @Delete(':id')
  deleteApplication(@Param('id', ParseIntPipe) ApplicationId: number) {
    return this.applicationService.deleteApplication(ApplicationId);
  }
}
