import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RolesGuard } from 'src/utils/roleGuard/roles.gurad';

@Module({
  controllers: [UserController],
  providers: [UserService, RolesGuard],
})
export class UserModule {}
