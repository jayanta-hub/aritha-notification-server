import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserRolesModule } from 'src/user_roles/user_roles.module';
import { UserRolesService } from 'src/user_roles/user_roles.service';
import { AuthFactoryService } from './auth.factory';
import { SuperadminService } from 'src/superadmin/superadmin.service';
import { OrgService } from 'src/org/org.service';
import { UserService } from 'src/users/users.service';

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
  providers: [
    AuthService,
    UserRolesService,
    AuthFactoryService,
    SuperadminService,
    OrgService,
    UserService,
  ],
  controllers: [AuthController],
  exports: [AuthService, UserRolesService, AuthFactoryService, UserService],
})
export class AuthModule {}
