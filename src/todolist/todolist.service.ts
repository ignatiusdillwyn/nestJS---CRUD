import { Injectable } from '@nestjs/common';
import { CreateTodolistDto } from './dto/create-todolist.dto.js';
import { UpdateTodolistDto } from './dto/update-todolist.dto.js';

@Injectable()
export class TodolistService {
  create(createTodolistDto: CreateTodolistDto) {
    return 'This action adds a new todolist';
  }

  findAll() {
    return `This action returns all todolist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todolist`;
  }

  update(id: number, updateTodolistDto: UpdateTodolistDto) {
    return `This action updates a #${id} todolist`;
  }

  remove(id: number) {
    return `This action removes a #${id} todolist`;
  }
}
