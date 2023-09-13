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
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { WalletsService } from '../wallets/wallets.service';

@ApiTags('Record')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('records')
export class RecordsController {
  constructor(
    private readonly recordsService: RecordsService,
    private readonly usersService: UsersService,
    private readonly walletService: WalletsService,
  ) {}

  @Post()
  async create(@Body() createRecordDto: CreateRecordDto, @Request() req) {
    // Validate the user
    const user = await this.usersService.findById(req.user.id);

    if (!user) {
      throw new UnauthorizedException('Unable to create category');
    }
    return this.recordsService.create(createRecordDto);
  }

  @Get('/wallet/:id')
  async findAll(@Param('id') id: number) {
    const wallet = await this.walletService.findOne(id);

    if (!wallet) {
      throw new BadRequestException('Wallet does not exist');
    }

    return await this.recordsService.findAll(wallet);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recordsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateRecordDto: UpdateRecordDto,
  ) {
    const record = await this.recordsService.findOne(id);

    if (!record) {
      throw new BadRequestException('Record does not exist');
    }

    return await this.recordsService.update(+id, updateRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordsService.remove(+id);
  }
}
