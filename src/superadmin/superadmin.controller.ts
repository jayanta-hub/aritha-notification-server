import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SuperadminService } from './superadmin.service';
import { SuperAdminSingupDto } from './dto/superadmin-credentials.dto';

@Controller('auth/superadmin')
export class SuperadminController {
  constructor(private superAdminService: SuperadminService) {}
  @Post('/signup')
  @UsePipes(new ValidationPipe())
  signUp(@Body() authCredentialsDto: SuperAdminSingupDto) {
    return this.superAdminService.superadminsignUp(authCredentialsDto);
  }
}
