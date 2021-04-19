import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'User E-mail' })
  @IsString({ message: 'Must be string' })
  @IsEmail({}, { message: 'Incorrect email type' })
  readonly email: string;

  @ApiProperty({ example: 'user', description: 'Username' })
  @IsString({ message: 'Must be string' })
  @Length(3, 20, { message: 'Username must be 3-20 characters long' })
  readonly username: string;

  @ApiProperty({
    example: 'aaBB12',
    description:
      'User password (must be 6-42 characters long and have one uppercase letter and one digit)',
  })
  @IsString({ message: 'Must be string' })
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/, {
    message:
      'Password must have one uppercase letter, one lowercase letter and one number',
  })
  @Length(6, 42, { message: 'Password must be 6-42 characters long' })
  readonly password: string;
}
