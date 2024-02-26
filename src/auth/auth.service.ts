/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { Users } from './authusers.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Super_admin } from 'src/superadmin/superadmin.entity';
import { AuthFactoryService } from './auth.factory';
import { ErrorMessage } from 'src/utils/helper';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private jwtService: JwtService,
    private authFactoryService: AuthFactoryService,
  ) {
    //
  }

  async signUp(userInfoDto: any) {
    return await this.authFactoryService.getService(
      userInfoDto?.userType,
      userInfoDto,
    );
  }
  async signIn(userInfoDto: any) {
    if (!userInfoDto) ErrorMessage('EMPTY');
    const users = await Promise.all([
      Users.findOne({ where: { username: userInfoDto.username } }),
      Super_admin.findOne({ where: { username: userInfoDto.username } }),
    ]);
    const user = users.find((u) => u); // Get the first found user
    try {
      // Compare the hash password
      if (!user) {
        ErrorMessage('User doesnot exist');
      }
      const isMatch = await bcrypt.compare(userInfoDto.password, user.password);
      if (!isMatch) {
        ErrorMessage('Invalid Password');
      }
      const isSuperAdmin = user instanceof Super_admin;
      const payload = {
        sub: user.password,
        username: user.username,
        scope: isSuperAdmin ? 'SUPERADMIN' : 'APPLICATIONUSER',
      };
      const accessToken = await this.jwtService.signAsync(payload);
      return {
        data: {
          id: user?.id,
          username: user?.username,
          orgid: user?.orgid,
          token: accessToken,
        },
        message: 'Login successful',
      };
    } catch (error) {
      this.logger.error(error);
      ErrorMessage('Invalid credentials');
    }
  }
}
