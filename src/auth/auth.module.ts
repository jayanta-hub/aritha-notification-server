import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserRolesModule } from 'src/user_roles/user_roles.module';
import { UserRolesService } from 'src/user_roles/user_roles.service';

@Module({
  imports: [
    AuthModule,
    UserRolesModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, UserRolesService],
  controllers: [AuthController],
  exports: [AuthService, UserRolesService],
})
export class AuthModule {}
