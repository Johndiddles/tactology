import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import appConfig from './app.config';

export const JwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      secret: appConfig().jwtSecret,
      signOptions: { expiresIn: '1h' },
    };
  },
  // secret: appConfig().jwtSecret,
  // signOptions: { expiresIn: '1h' },
};
