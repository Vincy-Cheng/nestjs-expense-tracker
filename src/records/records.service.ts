import { Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Record } from './entities/record.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
  ) {}

  async create(createRecordDto: CreateRecordDto) {
    const record = await this.recordRepository.create({
      price: createRecordDto.price,
      remarks: createRecordDto.remarks,
      wallet: createRecordDto.wallet,
      category: createRecordDto.category,
      date: createRecordDto.date,
    });

    return await this.recordRepository.save(record);
  }

  async findAll() {
    // return await this.recordRepository
    //   .createQueryBuilder('record')
    //   .leftJoin('record.wallet', 'wallet')
    //   .where('wallet.id = :id', { id: wallet.id });
  }

  async findOne(id: number) {
    return await this.recordRepository.findOne({ where: { id } });
  }

  async update(id: number, updateRecordDto: UpdateRecordDto) {
    return await this.recordRepository.save({
      id: id,
      price: updateRecordDto.price,
      remarks: updateRecordDto.remarks,
      date: updateRecordDto.date,
    });
  }

  async remove(id: number) {
    return await this.recordRepository.softDelete(id);
  }
}
