import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todolist } from './entities/todolist.entity.js';
import { UserEntity } from '../user/entities/user.entity.js';
import { CreateTodolistDto } from './dto/create-todolist.dto.js';
import { UpdateTodolistDto } from './dto/update-todolist.dto.js';

@Injectable()
export class TodolistService {
  constructor(
    @InjectRepository(Todolist)
    private readonly todolistRepo: Repository<Todolist>,

    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  // ✅ CREATE
  async create(createTodolistDto: CreateTodolistDto) {
    const { description, userId } = createTodolistDto;

    // Pastikan user-nya ada
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User dengan id ${userId} tidak ditemukan`);
    }

    const todo = this.todolistRepo.create({
      description,
      user,
      userId,              // isi FK langsung
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
  async update(id: number, updateTodolistDto: UpdateTodolistDto) {
    const todo = await this.findOne(id);

    // Kalau userId diubah, pastikan user barunya ada
    if (updateTodolistDto.userId && updateTodolistDto.userId !== todo.userId) {
      const user = await this.userRepo.findOneBy({
        id: updateTodolistDto.userId,
      });
      if (!user) {
        throw new NotFoundException(
          `User dengan id ${updateTodolistDto.userId} tidak ditemukan`,
        );
      }
      todo.user = user;
    }

    Object.assign(todo, updateTodolistDto);
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