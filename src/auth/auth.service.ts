import {
    ConflictException,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { JwtService } from '@nestjs/jwt';
  import * as bcrypt from 'bcrypt';
  import { UserEntity } from '../user/entities/user.entity.js';
  import { RegisterDto } from './dto/register.dto.js';
  
  @Injectable()
  export class AuthService {
    constructor(
      @InjectRepository(UserEntity)
      private readonly userRepository: Repository<UserEntity>,
      private readonly jwtService: JwtService,
    ) {}
  
    // ✅ LOGIN — verifikasi pakai bcrypt.compare
    async login(email: string, password: string) {
      if (!email || !password) {
        throw new UnauthorizedException('Email dan password wajib diisi');
      }
  
      const user = await this.userRepository.findOneBy({ email });
      if (!user) {
        throw new UnauthorizedException('Email atau password salah');
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException('Email atau password salah');
      }
  
      const payload = {
        userId: user.id,
        email: user.email,
        fullName: user.fullName,
      };
      const token = await this.jwtService.signAsync(payload);
  
      return {
        access_token: 'Bearer ' + token,
      };
    }
  
    // ✅ REGISTER — hash password sebelum disimpan
    async register(registerDto: RegisterDto): Promise<UserEntity> {
      const { fullName, email, password } = registerDto;
  
      // Cek email sudah dipakai atau belum
      const existing = await this.userRepository.findOneBy({ email });
      if (existing) {
        throw new ConflictException('Email sudah terdaftar');
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const userData = this.userRepository.create({
        fullName,
        email,
        password: hashedPassword,
      });
  
      return this.userRepository.save(userData);
    }
  }