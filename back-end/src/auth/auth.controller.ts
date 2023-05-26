import { Controller, Post, Body, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO, ResetPw } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // request from client
  @Post('register')
  register(@Body() body: AuthDTO) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: AuthDTO) {
    return this.authService.login(body);
  }

  @Patch('reset-password')
  resetPassword(@Body() body: ResetPw) {
    return this.authService.resetPassword(body);
  }
}
