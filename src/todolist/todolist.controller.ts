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
  UseGuards,
  Req
} from '@nestjs/common';
import { TodolistService } from './todolist.service.js';
import { CreateTodolistDto } from './dto/create-todolist.dto.js';
import { UpdateTodolistDto } from './dto/update-todolist.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import * as currentUserDecoratorJs from '../auth/decorators/current-user.decorator.js';
import type { JwtUser } from '../auth/decorators/current-user.decorator.js';

@Controller('todolist')
export class TodolistController {
  constructor(private readonly todolistService: TodolistService) { }

  @Post('/add')
  @UseGuards(JwtAuthGuard)
  async create(@Body() createTodolistDto: CreateTodolistDto, @currentUserDecoratorJs.CurrentUser() user: currentUserDecoratorJs.JwtUser) {
    console.log('User:', user);
    const data = await this.todolistService.create(createTodolistDto, user);
    return {
      success: true,
      data,
      message: 'Todolist Created Successfully',
    };
  }

  @Get('/getAll')
  @UseGuards(JwtAuthGuard)
  async findAll(@currentUserDecoratorJs.CurrentUser() user: currentUserDecoratorJs.JwtUser) {
    console.log('User:', user);
    console.log('test')

    const data = await this.todolistService.findAll();
    return {
      success: true,
      data,
      message: 'Todolist Fetched Successfully',
    };
  }

  // ✅ Bonus: ambil semua todo milik 1 user
  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  async findAllByUser(@Param('userId', ParseIntPipe) userId: number) {
    const data = await this.todolistService.findAllByUser(userId);
    return {
      success: true,
      data,
      message: 'Todolist by User Fetched Successfully',
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.todolistService.findOne(id);
    return {
      success: true,
      data,
      message: 'Todolist Fetched Successfully',
    };
  }

  @Post('/update/:id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodolistDto: UpdateTodolistDto,
    @currentUserDecoratorJs.CurrentUser() user: JwtUser,   // ✅ tambahkan ini
  ) {
    const data = await this.todolistService.update(
      id,
      updateTodolistDto,
      user,                          // ✅ kirim ke service
    );
    return {
      success: true,
      data,
      message: 'Todolist Updated Successfully',
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
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