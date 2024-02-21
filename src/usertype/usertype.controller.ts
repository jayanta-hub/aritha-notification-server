import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsertypeService } from './usertype.service';
import { CreateUserTypeDto } from './dto/user_type.dto';

@Controller('usertype')
export class UsertypeController {
  constructor(private userTypeService: UsertypeService) {}

  @Post('')
  @UsePipes(new ValidationPipe())
  createUserType(@Body() userType: CreateUserTypeDto) {
    return this.userTypeService.createUserType(userType);
  }
}
