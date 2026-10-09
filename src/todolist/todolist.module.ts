import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodolistService } from './todolist.service.js';
import { TodolistController } from './todolist.controller.js';
import { Todolist } from './entities/todolist.entity.js';
import { UserEntity } from '../user/entities/user.entity.js';

@Module({
  imports: [
    // ✅ Daftarkan kedua entity supaya relasi bisa di-resolve
    TypeOrmModule.forFeature([Todolist, UserEntity]),
  ],
  controllers: [TodolistController],
  providers: [TodolistService],
})
export class TodolistModule {}