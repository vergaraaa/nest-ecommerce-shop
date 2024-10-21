import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUser } from './decorators/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.authService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(@GetUser() user: User) {
    return {
      ok: true,
      message: 'private',
      user,
    };
  }
}
