import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TodolistService } from './todolist.service.js';
import { CreateTodolistDto } from './dto/create-todolist.dto.js';
import { UpdateTodolistDto } from './dto/update-todolist.dto.js';

@Controller('todolist')
export class TodolistController {
  constructor(private readonly todolistService: TodolistService) {}

  @Post('/add')
  async create(@Body() createTodolistDto: CreateTodolistDto) {
    const data = await this.todolistService.create(createTodolistDto);
    return {
      success: true,
      data,
      message: 'Todolist Created Successfully',
    };
  }

  @Get('/getAll')
  async findAll() {
    const data = await this.todolistService.findAll();
    return {
      success: true,
      data,
      message: 'Todolist Fetched Successfully',
    };
  }

  // ✅ Bonus: ambil semua todo milik 1 user
  @Get('user/:userId')
  async findAllByUser(@Param('userId', ParseIntPipe) userId: number) {
    const data = await this.todolistService.findAllByUser(userId);
    return {
      success: true,
      data,
      message: 'Todolist by User Fetched Successfully',
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.todolistService.findOne(id);
    return {
      success: true,
      data,
      message: 'Todolist Fetched Successfully',
    };
  }

  @Post('/update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodolistDto: UpdateTodolistDto,
  ) {
    const data = await this.todolistService.update(id, updateTodolistDto);
    return {
      success: true,
      data,
      message: 'Todolist Updated Successfully',
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const data = await this.todolistService.remove(id);
    return {
      success: true,
      data,
      message: 'Todolist Deleted Successfully',
    };
  }
}