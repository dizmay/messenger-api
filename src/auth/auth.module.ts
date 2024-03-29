import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.SECRET || 'SECRET',
      signOptions: {
        expiresIn: process.env.EXPIRES_IN || '24h',
      },
    }),
  ],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
