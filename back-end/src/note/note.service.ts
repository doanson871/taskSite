import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InsertNoteDTO } from './dto/insert.note.dto';
import { UpdateNoteDTO } from './dto/update.note.dto';

@Injectable()
export class NoteService {
  constructor(private prismaService: PrismaService) {}
  async getNotes(userId: number) {
    try {
      const notes = await this.prismaService.note.findMany({
        where: {
          userId,
        },
        select: {
          createdAt: true,
          description: true,
          title: true,
          id: true,
          url: true,
          userId: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      });

      return notes;
    } catch (error) {
      return error;
    }
  }

  async getNoteById(noteId: number) {
    try {
      const note = await this.prismaService.note.findUnique({
        where: {
          id: noteId,
        },
      });

      return note;
    } catch (error) {
      return error;
    }
  }

  async getNotesById(userId: number) {
    try {
      console.log(userId);

      const note = await this.prismaService.note.findMany({
        where: {
          userId: userId,
        },
        select: {
          createdAt: true,
          description: true,
          title: true,
          id: true,
          url: true,
          userId: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      });

      return note;
    } catch (error) {
      return error;
    }
  }

  // async insertNote(userId: number, insertNoteDTO: InsertNoteDTO) {
  //   try {
  //     const note = await this.prismaService.note.create({
  //       data: {
  //         userId: userId,
  //         description: insertNoteDTO.description,
  //         title: insertNoteDTO.title,
  //         url: insertNoteDTO.url || '',
  //       },
  //     });

  //     return note;
  //   } catch (error) {
  //     console.log(error);
  //     return error.code;
  //   }
  // }

  async insertNote(userId: number, insertNoteDTO: InsertNoteDTO) {
    const note = await this.prismaService.note.create({
      data: {
        userId: userId,
        description: insertNoteDTO.description,
        title: insertNoteDTO.title,
        url: insertNoteDTO.url || '',
      },
    });

    return {
      statusCode: 200,
      message: 'OK',
      data: note,
    };
  }

  async updateNoteById(noteId: number, updateNoteDTO: UpdateNoteDTO) {
    try {
      const note = await this.prismaService.note.findUnique({
        where: {
          id: noteId,
        },
      });
      if (!note) {
        throw new ForbiddenException('Can not fine Note to update');
      }
      return this.prismaService.note.update({
        where: {
          id: noteId,
        },
        data: {
          ...updateNoteDTO,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async deleteNoteById(noteId: number) {
    const note = await this.prismaService.note.findUnique({
      where: {
        id: noteId,
      },
    });

    if (!note) {
      throw new ForbiddenException('Can not fine Note to delete');
    }

    return this.prismaService.note.delete({
      where: {
        id: noteId,
      },
    });
  }
}
