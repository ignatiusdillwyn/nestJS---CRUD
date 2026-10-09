// export class CreateTodolistDto {}
import {
    IsEmail,
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  
  export class CreateTodolistDto {
    @IsNotEmpty()
    @IsString()
    description: string;
  }
