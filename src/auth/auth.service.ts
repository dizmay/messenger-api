import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcryptjs';
import { LoginUserDto, CreateUserDto } from 'src/users/dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async generateToken(user: User) {
    const payload = { id: user.id, email: user.email, username: user.username };
    return this.jwtService.sign(payload);
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.userService.getByEmail(userDto.email);

    if (!user) {
      throw new UnauthorizedException({ message: 'User not found!' });
    }

    const isPasswordCorrect = await compare(userDto.password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException({ message: 'Wrong email or password!' });
    }

    return user;
  }

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const _user = await this.userService.getByEmail(userDto.email);
    if (_user) {
      throw new HttpException('User already exist!', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await hash(userDto.password, 15);
    const user = await this.userService.create({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }
}
