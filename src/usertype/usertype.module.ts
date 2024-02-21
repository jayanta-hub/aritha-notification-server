import { Module } from '@nestjs/common';
import { UsertypeService } from './usertype.service';
import { UsertypeController } from './usertype.controller';

@Module({
  controllers: [UsertypeController],
  providers: [UsertypeService],
})
export class UsertypeModule {}
