import { Test, TestingModule } from '@nestjs/testing';
import { TodolistController } from './todolist.controller.js';
import { TodolistService } from './todolist.service.js';

describe('TodolistController', () => {
  let controller: TodolistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodolistController],
      providers: [TodolistService],
    }).compile();

    controller = module.get<TodolistController>(TodolistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
