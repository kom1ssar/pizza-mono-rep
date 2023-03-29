import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserCreateDto {
  @ApiProperty({ example: 'lol@yajandex.ru' })
  @IsEmail()
  public email: string;

  @ApiProperty({ example: 'keK123' })
  @IsString()
  public password: string;

  @ApiProperty({ example: 'keK123' })
  @IsString()
  public repeatPassword: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  public firstName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  public address?: string;
}
