/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { CarController } from './car/car.controller';
import { CarModule } from './car/car.module';
import { CarService } from './car/car.service';
import {
  CacheInterceptor,
  CacheModule,
  CacheModuleAsyncOptions,
} from '@nestjs/cache-manager';
import redisConfig from './redis/redisConfig/redisConfig';
import { redisStore } from 'cache-manager-redis-store';
import { MailController } from './mail/mail.controller';
import { EmailModule } from './mail/mail.module';
import { ResetUsernameController } from './reset-username/reset-username.controller';
import { ResetUsernameModule } from './reset-username/reset-username.module';
import { ResetUsernameService } from './reset-username/reset-username.service';

const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  inject: [ConfigService],
  useFactory: async (redisConfig: ConfigService) => {
    const store = await redisStore({
      ttl: 30 * 1000,
      socket: {
        host: redisConfig.get('redis.host'),
        port: redisConfig.get('redis.port'),
      },
    });
    return { store };
  },
};

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [redisConfig],
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    CacheModule.registerAsync(RedisOptions),
    AuthModule,
    DatabaseModule,
    OrgModule,
    PermissionModule,
    AppDetailsModule,
    UserRolesModule,
    SuperadminModule,
    UsertypeModule,
    CarModule,
    EmailModule,
    ResetUsernameModule,
  ],
  controllers: [
    UserController,
    RolesController,
    UsertypeController,
    CarController,
    MailController,
    ResetUsernameController,
  ],
  providers: [
    AppService,
    AuthService,
    UserService,
    RolesService,
    UsertypeService,
    CarService,
    {
      provide: 'APP_INTERCEPTER',
      useClass: CacheInterceptor,
    },
    ResetUsernameService,
  ],
})
export class AppModule {}
