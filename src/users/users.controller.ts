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
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  // @UseGuards(AuthGuard)
  // @Get()
  // getAll() {
  //   return this.userService.getAll();
  // }
  @UseGuards(AuthGuard)
  @Delete('delete/:id')
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
  @UsePipes(new ValidationPipe())
  userProfile(@Param() id: UserId) {
    return this.userService.userProfile(id);
  }
}
