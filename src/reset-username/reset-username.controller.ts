import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ResetUsernameService } from './reset-username.service';

@Controller('reset-username')
export class ResetUsernameController {
  constructor(private readonly resetUsername: ResetUsernameService) {}
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @Post()
  async createSuperAdmin(@Body() createSuperAdmin: any) {
    return await this.resetUsername.update(createSuperAdmin);
  }
}
