import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './entities/wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallet) private accountRepository: Repository<Wallet>,
  ) {}

  create(createWalletDto: CreateWalletDto) {
    return 'This action adds a new account';
  }

  async findAll(userId: number) {
    return await this.accountRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, UpdateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
