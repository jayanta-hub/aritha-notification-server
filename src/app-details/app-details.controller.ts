import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppDetailsService } from './app-details.service';
import { AppdetailsDto } from './dto/appdetals.dto';

@Controller('app-details')
export class AppDetailsController {
  constructor(private Service: AppDetailsService) {}
  @Post()
  @UsePipes(new ValidationPipe())
  createRole(@Body() appInfo: AppdetailsDto) {
    return this.Service.createApp(appInfo);
  }
}
