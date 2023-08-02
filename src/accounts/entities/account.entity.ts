import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsISO4217CurrencyCode, IsNotEmpty } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity({ name: 'accounts' })
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ length: 500 })
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @Column()
  @ApiProperty()
  @IsISO4217CurrencyCode()
  currency: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  @Exclude()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;

  @OneToMany(() => Category, (category) => category.account)
  categories: Category[];

  constructor(partial: Partial<Account>) {
    super();
    Object.assign(this, partial);
  }
}
