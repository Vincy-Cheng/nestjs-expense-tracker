import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateCategoryOrderDto } from './dto/update-category-order';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * Create User in the database
   * @param {CreateUserDto} createUserDto
   * @returns
   */
  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, salt);

    const user = await this.userRepository.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: hash,
    });

    return await this.userRepository.save(user);
  }

  async findByUsername(username): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { username },
    });
  }

  async findByEmail(email): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async findById(id): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async updateCategoryOrder(updateCategoryOrderDto: UpdateCategoryOrderDto) {
    return await this.userRepository.save({
      id: updateCategoryOrderDto.id,
      categoryOrder: updateCategoryOrderDto.categoryOrder,
    });
  }

  async delete(user: User) {
    return await this.userRepository.softDelete(user.id);
  }
}
