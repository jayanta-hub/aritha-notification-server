import {
  Controller,
  Delete,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DeleteUser, UserId } from 'src/auth/dto/auth-interface';
import { UserService } from './users.service';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@ApiBearerAuth()
@Controller('users')
@UseInterceptors(CacheInterceptor)
export class UserController {
  constructor(private userService: UserService) {}
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
  @ApiParam({
    name: 'id',
    required: true,
    description: 'userid to fetch user profile',
    type: 'string',
  })
  @UseGuards(AuthGuard)
  @Get('/profile/:id')
  @UsePipes(new ValidationPipe())
  @CacheTTL(10 * 1000)
  async userProfile(@Param() id: UserId) {
    console.log('first,.........');
    return this.userService.userProfile(id);
  }

  @Get()
  @CacheKey('as')
  get() {
    return this.userService.get();
  }
}
