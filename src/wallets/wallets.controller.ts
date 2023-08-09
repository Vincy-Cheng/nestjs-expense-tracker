import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseGuards,
  UseInterceptors,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { Wallet } from './entities/wallet.entity';

@ApiTags('Wallet')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('wallets')
export class WalletsController {
  constructor(
    private readonly walletsService: WalletsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(@Body() createWalletDto: CreateWalletDto): Promise<Wallet> {
    // Validate the user
    const user = await this.usersService.findById(createWalletDto.userId);
    return await this.walletsService.create(createWalletDto, user);
  }

  @Get()
  async findAll(@Request() req) {
    return await this.walletsService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walletsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletsService.update(+id, updateWalletDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    // Check wallet is existing

    const wallet = await this.walletsService.findOne(id);

    if (wallet) {
      return await this.walletsService.remove(wallet.id);
    }

    throw new BadRequestException('Wallet does not exist.');
  }
}
