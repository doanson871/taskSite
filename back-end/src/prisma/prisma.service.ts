import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class PrismaService extends PrismaClient {
  constructor(configService: ConfigService) {
    super({
      datasources: {
        db: {
          // url: 'postgresql://postgres:abc123@localhost:5434/testdb?schema=public',
          url: configService.get('DATABASE_URL'),
        },
      },
    });
  }

  cleanDatabase() {
    return this.$transaction([this.note.deleteMany(), this.user.deleteMany()]);
  }
}
