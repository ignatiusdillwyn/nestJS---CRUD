import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module.js';
import { TodolistModule } from './todolist/todolist.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      password: 'Ultraman2!',
      username: 'postgres',
      database: 'nest-crud',
      autoLoadEntities: true,  // ✅ otomatis load entity dari forFeature()
      synchronize: true,
      logging: true,
    }),
    UserModule,
    TodolistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}