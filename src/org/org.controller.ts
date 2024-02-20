import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrgService } from './org.service';
import { OrgSignUpDto } from './dto/orgCredentials.dto';

@Controller('auth/org')
export class OrgController {
  constructor(private orgService: OrgService) {}
  @HttpCode(HttpStatus.OK)
  @Post('/signup')
  @UsePipes(new ValidationPipe())
  signIn(@Body() userInfoDto: OrgSignUpDto) {
    return this.orgService.orgSignUp(userInfoDto);
  }
}
