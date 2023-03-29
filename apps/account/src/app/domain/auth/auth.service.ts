import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserCreateDto } from '../user/dto/user-create.dto';
import { User } from '../user/user';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private jwtService: JwtService
  ) {}

  async register(dto: UserCreateDto): Promise<User> {
    const validatePassword = dto.password === dto.repeatPassword;
    if (!validatePassword) {
      throw new HttpException(
        'repeat password is wrong',
        HttpStatus.BAD_REQUEST
      );
    }

    const candidate = await this.userRepo.getByEmail(dto.email);
    if (candidate) {
      throw new HttpException(
        'email is already exists',
        HttpStatus.BAD_REQUEST
      );
    }
    const userEntity = new User();
    userEntity.createByDto(dto);
    const user = await this.userRepo.save(userEntity);
    delete user.password;
    return user;
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user.id, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepo.getByEmail(email);
    if (!user) {
      throw new HttpException(
        'incorrect email or password',
        HttpStatus.BAD_REQUEST
      );
    }
    const isCorrectPassword = await user.passwordCompare(password);
    if (!isCorrectPassword) {
      throw new HttpException(
        'incorrect email or password',
        HttpStatus.BAD_REQUEST
      );
    }
    return user;
  }
}
