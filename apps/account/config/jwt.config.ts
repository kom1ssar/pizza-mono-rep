import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  privateKey: 'Secret',
  signOptions: { expiresIn: '24h' },
};
