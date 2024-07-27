import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsertypeService } from './usertype.service';
import { CreateUserTypeDto } from './dto/user_type.dto';

@Controller('usertype')
export class UsertypeController {
  constructor(private userTypeService: UsertypeService) {}

  @Get('')
  @UsePipes(new ValidationPipe())
  getUserType() {
    return this.userTypeService.getUserType();
  }
  @Post('')
  @UsePipes(new ValidationPipe())
  createUserType(@Body() userType: CreateUserTypeDto) {
    return this.userTypeService.createUserType(userType);
  }
}
