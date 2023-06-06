import {
  Controller,
  UseGuards,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { MyJwtGuard } from '..//auth/guard';
import { InsertNoteDTO } from './dto/insert.note.dto';
import { UpdateNoteDTO } from './dto/update.note.dto';
import { NoteService } from './note.service';

@UseGuards(MyJwtGuard)
@Controller('notes')
export class NoteController {
  constructor(private noteService: NoteService) {}
  @Get()
  getNotes(@GetUser('id') userId: number) {
    return this.noteService.getNotes(userId);
  }

  @Get(':id')
  getNoteById(@Param('id', ParseIntPipe) noteId: number) {
    return this.noteService.getNoteById(noteId);
  }

  @Get('user/:id')
  getNotesById(@Param('id', ParseIntPipe) userId: number) {
    return this.noteService.getNotesById(userId);
  }

  @Post()
  insertNote(
    @GetUser('id') userId: number,
    @Body() insertNoteDTO: InsertNoteDTO,
  ) {
    console.log(
      `userId : ${userId}, noteId : ${JSON.stringify(insertNoteDTO)}`,
    );
    return this.noteService.insertNote(userId, insertNoteDTO);
  }

  @Patch(':id')
  updateNoteById(
    @Param('id', ParseIntPipe) noteId: number,
    @Body() updateNoteDTO: UpdateNoteDTO,
  ) {
    console.log(noteId, updateNoteDTO);

    return this.noteService.updateNoteById(noteId, updateNoteDTO);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  deleteNoteById(@Query('id', ParseIntPipe) noteId: number) {
    return this.noteService.deleteNoteById(noteId);
  }
}
