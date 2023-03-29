import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({ type: String, example: 'lol@yajandex.ru"' })
  @IsString()
  public email: string;

  @ApiProperty({ type: String, example: 'keK123' })
  @IsString()
  public password: string;
}
