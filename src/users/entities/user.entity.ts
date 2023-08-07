import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from '../../accounts/entities/account.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ length: 500, unique: true })
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @Column({ length: 500, unique: true })
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

  @DeleteDateColumn({ type: 'timestamp' })
  @Exclude()
  deletedAt: Date;

  @OneToMany(() => Account, (accounts) => accounts.user)
  accounts: Account[];

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
