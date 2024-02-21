import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserService } from './users/users.service';
import { UserController } from './users/users.controller';
import { RolesController } from './role/roles.controller';
import { RolesService } from './role/roles.service';
import { OrgModule } from './org/org.module';
import { PermissionModule } from './permission/permission.module';
import { AppDetailsModule } from './app-details/app-details.module';
import { UserRolesModule } from './user_roles/user_roles.module';
import { SuperadminModule } from './superadmin/superadmin.module';
import { UsertypeController } from './usertype/usertype.controller';
import { UsertypeModule } from './usertype/usertype.module';
import { UsertypeService } from './usertype/usertype.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    AuthModule,
    DatabaseModule,
    OrgModule,
    PermissionModule,
    AppDetailsModule,
    UserRolesModule,
    SuperadminModule,
    UsertypeModule,
  ],
  controllers: [UserController, RolesController, UsertypeController],
  providers: [
    AppService,
    AuthService,
    UserService,
    RolesService,
    UsertypeService,
  ],
})
export class AppModule {}
