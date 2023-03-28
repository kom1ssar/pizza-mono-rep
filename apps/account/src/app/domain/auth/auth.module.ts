import { Module } from '@nestjs/common';
import { AuthController } from '../../applications/controllers/auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
