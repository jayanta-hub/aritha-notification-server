import { Module } from '@nestjs/common';
import { UserRolesController } from './user_roles.controller';
import { UserRolesService } from './user_roles.service';

@Module({
  controllers: [UserRolesController],
  providers: [UserRolesService],
})
export class UserRolesModule {}
