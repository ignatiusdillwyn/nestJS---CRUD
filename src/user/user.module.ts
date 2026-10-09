// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { UserEntity } from './entities/user.entity.js';
import { Todolist } from '../todolist/entities/todolist.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, Todolist]), // ✅ dua-duanya
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}