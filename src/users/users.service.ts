import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

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

    return await this.userRepository.save({
      username: createUserDto.username,
      email: createUserDto.email,
      password: hash,
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  async findByUsername(username): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { username },
    });
    // return this.users.find((user) => user.username === username);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async delete(user: User) {
    return await this.userRepository.softDelete(user.id);
  }
}
