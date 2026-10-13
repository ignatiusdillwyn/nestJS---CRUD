import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
  } from '@nestjs/common';
  import { AuthService } from './auth.service.js';
  import { LoginDto } from './dto/login.dto.js';
  import { RegisterDto } from './dto/register.dto.js';
  
  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Post('/register')
    @HttpCode(HttpStatus.CREATED) // ✅ 201
    async register(@Body() registerDto: RegisterDto) {
      const user = await this.authService.register(registerDto);
  
      return {
        status: 201,
        message: 'User Created Successfully',
        data: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
        },
      };
    }
  
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() dto: LoginDto) {
      return this.authService.login(dto.email, dto.password);
    }
  }