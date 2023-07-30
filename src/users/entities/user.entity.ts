import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ length: 500 })
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @Column({ length: 500 })
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({})
  @ApiProperty()
  @IsNotEmpty()
  @Exclude({ toPlainOnly: true })
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Exclude()
  updatedAt: Date;
}
