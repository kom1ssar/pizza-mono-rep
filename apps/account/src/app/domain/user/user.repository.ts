import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>
  ) {}

  async save(user: User): Promise<User> {
    return await this.repo.save(user);
  }

  async getByEmail(email: string): Promise<User> {
    return await this.repo
      .createQueryBuilder('users')
      .where('users.email = :email', { email })
      .getOne();
  }
}
