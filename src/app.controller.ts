import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @UseGuards(AuthGuard('local'))
  // @Post('auth/login')
  // async login(@Request() req) {
  //   return req.user;
  // }

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login2')
  // async login2(@Request() req) {
  //   return req.user;
  // }

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login3')
  // async login3(@Request() req) {
  //   // Return the access token

  //   return this.authService.login(req.user);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
