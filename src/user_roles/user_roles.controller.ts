import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserRolesService } from './user_roles.service';
import { CreateRolesDto } from './dto/user_roles.dto';

@Controller('user-roles')
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  @HttpCode(HttpStatus.OK)
  @Post('')
  @UsePipes(new ValidationPipe())
  signIn(@Body() userInfoDto: CreateRolesDto) {
    return this.userRolesService.createRoles(userInfoDto);
  }
}
