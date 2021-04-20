import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({
    example: '86942a13-4f4e-412b-b1af-3ed0c50b984f',
    description: 'Unique ID(uuid)',
    default: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'User E-mail' })
  @Column()
  email: string;

  @ApiProperty({ example: 'user', description: 'Username' })
  @Column()
  username: string;

  @ApiProperty({
    example: 'aaBB12',
    description:
      'User password (must be at least 6 characters long and have one uppercase letter and one digit)',
  })
  @Column()
  password: string;
}
