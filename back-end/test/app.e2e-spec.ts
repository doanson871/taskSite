import { INestApplication } from '@nestjs/common/interfaces';
import { ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

// npx dotenv -e .env.test -- prisma studio : TEST
// npx dotenv -e .env -- prisma studio : DEV
// npx prisma migrate dev

const POST = 3002;

describe('App EndtoEnd Tests', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  beforeAll(async () => {
    const appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = appModule.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    app.listen(POST);
    prismaService = app.get(PrismaService);
    await prismaService.cleanDatabase();
  });
  afterAll(async () => {
    app.close();
  });
  it.todo('should PASS, haha');
  it.todo('should PASS, keke');
});
