import { Module } from '@nestjs/common';
import { SuperadminService } from './superadmin.service';

@Module({
  controllers: [],
  providers: [SuperadminService],
})
export class SuperadminModule {}
