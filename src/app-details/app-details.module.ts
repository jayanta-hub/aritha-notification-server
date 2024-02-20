import { Module } from '@nestjs/common';
import { AppDetailsController } from './app-details.controller';
import { AppDetailsService } from './app-details.service';

@Module({
  controllers: [AppDetailsController],
  providers: [AppDetailsService]
})
export class AppDetailsModule {}
