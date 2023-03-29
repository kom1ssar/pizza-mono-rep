import { Module } from '@nestjs/common';
import { AuthController } from '../../applications/controllers/auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../applications/strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../../../../config/jwt.config';
import { LocalAuthGuard } from '../../applications/guards/local-atuh.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, LocalStrategy, LocalAuthGuard],
})
export class AuthModule {}
