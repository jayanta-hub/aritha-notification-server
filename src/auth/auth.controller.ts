/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SingupDto } from './dto/auth-credentials.dto';
import { UsersCustomValidation } from './dto/usersCustomValidation.decorator';
import { UsersSingupDto } from 'src/users/dto/users.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  @UsePipes(new ValidationPipe())
  signIn(@Body() userInfoDto: SigninDto) {
    console.log('🚀 ~ AuthController ~ signIn ~ userInfoDto:', userInfoDto);
    return this.authService.signIn(userInfoDto);
  }
  @Post('/signup')
  @UsePipes(new ValidationPipe())
  signUp(
    @UsersCustomValidation(
      new ValidationPipe({ validateCustomDecorators: true }),
    )
    authCredentialsDto: any,
  ) {
    return this.authService.signUp(authCredentialsDto);
  }
}
