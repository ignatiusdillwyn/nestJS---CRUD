import { PartialType } from '@nestjs/mapped-types';
import { CreateTodolistDto } from './create-todolist.dto.js';

export class UpdateTodolistDto extends PartialType(CreateTodolistDto) {}
