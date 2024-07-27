import { Module } from '@nestjs/common';
import { OrgService } from './org.service';

@Module({
  controllers: [],
  providers: [OrgService],
})
export class OrgModule {}
