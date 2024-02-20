import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRolesDto } from './dto/roles.dto';

@Controller('roles')
export class RolesController {
  constructor(private Service: RolesService) {}
  @Get()
  getRoles() {
    return this.Service.getRoles();
  }
  @Post()
  @UsePipes(new ValidationPipe())
  createRole(@Body() rolesInfo: CreateRolesDto) {
    return this.Service.createRole(rolesInfo);
  }
}
