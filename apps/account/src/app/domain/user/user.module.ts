import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from '../../applications/controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user';
import { UserRepository } from '../../infrastructure/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserRepository],
})
export class UserModule {}
