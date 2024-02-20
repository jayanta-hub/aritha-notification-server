import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/permission.dto';

@Controller('permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}
  @Post()
  @UsePipes(new ValidationPipe())
  createPermissions(@Body() permissions: CreatePermissionDto) {
    return this.permissionService.createPermission(permissions);
  }
}
