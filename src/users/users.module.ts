import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthGuard } from '../guards/auth.guard';

@Module({
  providers: [
    UserService,
    JwtAuthGuard,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
