import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { UserCreateDto } from '../../domain/user/dto/user-create.dto';
import { AuthService } from '../../domain/auth/auth.service';
import { RegisterUserResponse } from '../../domain/auth/dto/register-user.response';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../guards/local-atuh.guard';
import { LoginUserResponse } from '../../domain/auth/dto/login-user.response';
import { UserLoginDto } from '../../domain/auth/dto/user-login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: RegisterUserResponse })
  @Post('/register')
  async registration(
    @Body() dto: UserCreateDto
  ): Promise<RegisterUserResponse> {
    const user = await this.authService.register(dto);
    return new RegisterUserResponse(user);
  }

  @ApiOkResponse({ type: LoginUserResponse })
  @ApiBody({ type: UserLoginDto })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req): Promise<LoginUserResponse> {
    return await this.authService.login(req.user);
  }
}
