import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Todolist } from '../../todolist/entities/todolist.entity.js';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // ✅ Relasi: satu User punya banyak Todolist
  @OneToMany(() => Todolist, (todo) => todo.user)
  todolists: Todolist[];
}