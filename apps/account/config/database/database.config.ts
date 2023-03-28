import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as process from 'process';
import { User } from '../../src/app/domain/user/user';
export const OrmConfig = (): TypeOrmModuleAsyncOptions => {
  return {
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('POSTGRES_HOST'),
      port: parseInt(configService.get('POSTGRES_PORT')),
      database: configService.get('POSTGRES_DATABASE'),
      username: configService.get('POSTGRES_USER'),
      password: configService.get('POSTGRES_PASSWORD'),
      entities: [User],
      synchronize: true,
    }),
    inject: [ConfigService],
    imports: [ConfigModule],
  };
};
console.log(process.env['PG_USER']);
