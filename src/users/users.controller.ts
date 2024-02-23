import {
  Controller,
  Delete,
  Get,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DeleteUser, UserId } from 'src/auth/dto/auth-interface';
import { UserService } from './users.service';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  // @UseGuards(AuthGuard)
  // @Get()
  // getAll() {
  //   return this.userService.getAll();
  // }
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Enter userId',
    required: true,
  })
  delete(@Param() id: DeleteUser) {
    return this.userService.deleteById(id);
  }
  @ApiBearerAuth() // for swagger
  @UseGuards(AuthGuard)
  @Get('/profile/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'userid to fetch user profile',
    type: 'string',
  })
  @UsePipes(new ValidationPipe())
  userProfile(@Param() id: UserId) {
    console.log('🚀 ~ UserController ~ userProfile ~ id:', id);
    return this.userService.userProfile(id);
  }
}
