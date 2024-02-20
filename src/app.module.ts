import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
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
  ],
  controllers: [AppController, UserController, RolesController],
  providers: [AppService, AuthService, UserService, RolesService],
})
export class AppModule {}
