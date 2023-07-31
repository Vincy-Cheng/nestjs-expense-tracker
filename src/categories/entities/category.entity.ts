import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEnum, IsNotEmpty } from 'class-validator';
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
import { IconName } from '../../enums';
import { Account } from '../../accounts/entities/account.entity';
import { Record } from '../../records/entities/record.entity';

@Entity({ name: 'categories' })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ length: 500 })
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @Column()
  @ApiProperty({ enum: IconName })
  @IsNotEmpty()
  @IsEnum(IconName)
  icon: IconName;

  @CreateDateColumn({ type: 'timestamp' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  @Exclude()
  deletedAt: Date;

  @ManyToOne(() => Account, (account) => account.categories)
  account: Account;

  @OneToMany(() => Record, (records) => records.category)
  records: Record[];

  constructor(partial: Partial<Category>) {
    super();
    Object.assign(this, partial);
  }
}
