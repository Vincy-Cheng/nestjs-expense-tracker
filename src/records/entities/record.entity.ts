import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { RecordType } from '../../enums';

@Entity({ name: 'records' })
export class Record extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @Column()
  @ApiProperty({ type: RecordType })
  @IsEnum(RecordType)
  @IsNotEmpty()
  recordType: RecordType;

  @Column({ length: 500 })
  @ApiProperty()
  @IsNotEmpty()
  remarks: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  @Exclude()
  deletedAt: Date;

  @ManyToOne(() => Category, (category) => category.records)
  category: Category;

  constructor(partial: Partial<Record>) {
    super();
    Object.assign(this, partial);
  }
}
