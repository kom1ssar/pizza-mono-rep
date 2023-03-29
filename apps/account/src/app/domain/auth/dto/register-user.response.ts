import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/user';

export class RegisterUserResponse {
  @ApiProperty({ type: Number })
  id: number;
  email: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
  }
}
