import { Module } from '@nestjs/common';
import { ResetUsernameService } from './reset-username.service';
import { ResetUsernameController } from './reset-username.controller';

@Module({
  controllers: [ResetUsernameController],
  providers: [ResetUsernameService],
})
export class ResetUsernameModule {}
