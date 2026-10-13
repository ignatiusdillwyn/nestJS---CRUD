import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todolist } from './entities/todolist.entity.js';
import { UserEntity } from '../user/entities/user.entity.js';
import { CreateTodolistDto } from './dto/create-todolist.dto.js';
import { UpdateTodolistDto } from './dto/update-todolist.dto.js';
import * as currentUserDecoratorJs from '../auth/decorators/current-user.decorator.js';
import { JwtUser } from '../auth/decorators/current-user.decorator.js';

@Injectable()
export class TodolistService {
  constructor(
    @InjectRepository(Todolist)
    private readonly todolistRepo: Repository<Todolist>,

    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) { }

  // ✅ CREATE
  async create(createTodolistDto: CreateTodolistDto, currentUser: JwtUser) {
    const { description } = createTodolistDto;
    const userId = currentUser.userId;   // ✅ dari token, bukan dari body

    console.log('User dari token:', currentUser);

    // Pastikan user-nya ada di database
    const userData = await this.userRepo.findOneBy({ id: userId });
    if (!userData) {   // ✅ cek userData, BUKAN user
      throw new NotFoundException(`User dengan id ${userId} tidak ditemukan`);
    }

    const todo = this.todolistRepo.create({
      description,
      user: userData,      // ✅ dari DB
      userId,              // ✅ FK terisi dari token
      created_at: new Date(),
      updated_at: new Date(),
    });

    return this.todolistRepo.save(todo);
  }

  // ✅ READ ALL (beserta user-nya)
  async findAll() {
    return this.todolistRepo.find({
      relations: { user: true },
      order: { created_at: 'DESC' },
    });
  }

  // ✅ READ ONE
  async findOne(id: number) {
    const todo = await this.todolistRepo.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!todo) {
      throw new NotFoundException(`Todolist dengan id ${id} tidak ditemukan`);
    }
    return todo;
  }

  // ✅ READ by User (bonus — semua todo milik 1 user)
  async findAllByUser(userId: number) {
    return this.todolistRepo.find({
      where: { userId },
      order: { created_at: 'DESC' },
    });
  }

  // ✅ UPDATE
  async update(
    id: number,
    updateTodolistDto: UpdateTodolistDto,
    currentUser: JwtUser,
  ) {
    const todo = await this.findOne(id);

    // ✅ Pastikan todolist ini milik user yang login
    if (todo.userId !== currentUser.userId) {
      throw new ForbiddenException(
        'Anda tidak berhak mengubah todolist ini',
      );
    }

    // ✅ Hanya boleh ubah field yang diizinkan (description)
    if (updateTodolistDto.description !== undefined) {
      todo.description = updateTodolistDto.description;
    }

    todo.updated_at = new Date();

    return this.todolistRepo.save(todo);
  }

  // ✅ DELETE
  async remove(id: number) {
    const todo = await this.findOne(id);
    await this.todolistRepo.remove(todo);
    return { id, deleted: true };
  }
}