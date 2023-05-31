import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MemberService {
  constructor(private prismService: PrismaService) {}

  async updateMember(conversationId: number, userId: number, data: any) {
    try {
      const member = await this.prismService.member.findFirst({
        where: {
          conversationId: conversationId,
          userId: userId,
        },
      });

      if (!member) {
        throw new ForbiddenException("Couldn't find");
      }
      await this.prismService.member.update({
        where: {
          id: member.id,
        },
        data: {
          seen: data.seen,
        },
      });

      return {
        statusCode: 200,
        msg: 'sucessfully updated',
      };
    } catch (err) {
      return {
        statusCode: 404,
        err,
      };
    }
  }
}
