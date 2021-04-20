import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(dto);
    await this.usersRepository.save(user);
    return user;
  }

  async getAll(): Promise<User[]> {
    const users = this.usersRepository.find();
    return users;
  }

  async getById(id: string): Promise<User> {
    const user = this.usersRepository.findOne({ where: { id } });
    return user;
  }

  async getByEmail(email: string): Promise<User> {
    const user = this.usersRepository.findOne({ where: { email } });
    return user;
  }
}
