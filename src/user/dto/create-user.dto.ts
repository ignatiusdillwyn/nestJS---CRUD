import {
    IsEmail,
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  
  // create-user-dto
  export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    fullName: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
  }