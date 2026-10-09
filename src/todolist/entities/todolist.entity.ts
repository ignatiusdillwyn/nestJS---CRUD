import * as typeorm from 'typeorm';
  import { UserEntity } from '../../user/entities/user.entity.js';
  
  @typeorm.Entity()
  export class Todolist {
    @typeorm.PrimaryGeneratedColumn()
    id: number;
  
    @typeorm.Column()
    description: string;
  
    // ✅ Gunakan Relation<UserEntity>
    @typeorm.ManyToOne(() => UserEntity, (user) => user.todolists, {
      onDelete: 'CASCADE',
    })
    @typeorm.JoinColumn({ name: 'userId' })
    user: typeorm.Relation<UserEntity>;
  
    @typeorm.Column()
    userId: number;
  
    @typeorm.Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
  
    @typeorm.Column({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
    })
    updated_at: Date;
  }