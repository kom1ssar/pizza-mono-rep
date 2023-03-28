import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from '../../applications/controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
