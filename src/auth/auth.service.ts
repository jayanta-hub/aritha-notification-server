/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { Users } from './authusers.entity';
import { randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Org } from 'src/org/ogr.entity';
import { UserRolesService } from 'src/user_roles/user_roles.service';
import { Super_admin } from 'src/superadmin/superadmin.entity';
import { AuthFactoryService } from './auth.factory';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private jwtService: JwtService,
    private userRoleService: UserRolesService,
    private authFactoryService: AuthFactoryService,
  ) {
    //
  }

  async signUp(userInfoDto: any) {
    return await this.authFactoryService.get(
      userInfoDto?.userType,
      userInfoDto,
    );
    // try {
    //   const ExsitingUser = await Users.findOne({
    //     where: {
    //       username: userInfoDto.username,
    //     },
    //   });
    //   if (!ExsitingUser) {
    //     const saltOrRounds = 10;
    //     const hash = await bcrypt.hash(userInfoDto.password, saltOrRounds);
    //     userInfoDto['id'] = randomUUID();
    //     userInfoDto['password'] = hash;
    //     const UserInfo = {
    //       id: userInfoDto?.id,
    //       username: userInfoDto?.username,
    //       password: userInfoDto?.password,
    //       firstname: userInfoDto?.firstname,
    //       lastname: userInfoDto?.lastname,
    //       phone: userInfoDto?.phone,
    //       email: userInfoDto?.email,
    //       orgid: userInfoDto?.orgid,
    //     };
    //     const orgExists = await Org.findOne({
    //       where: { id: userInfoDto?.orgid },
    //     });
    //     if (!orgExists) {
    //       throw new Error('Invalid organization ID');
    //     }
    //     const result = await Users.create(UserInfo, {
    //       returning: false,
    //     });
    //     // To Do  return successful message
    //     // const User_role = userInfoDto?.appdetails.map((e) => {
    //     //   return {
    //     //     id: randomUUID(),
    //     //     username: userInfoDto?.id,
    //     //     role: e?.role,
    //     //     permission: e?.permission,
    //     //     appname: e?.appname,
    //     //   };
    //     // });
    //     // await this.userRoleService.storeUserRoles(User_role);
    //     return result;
    //   } else {
    //     throw new Error('user is existing. Please try with another UserName.');
    //   }
    // } catch (e) {
    //   this.logger.error(e);
    //   return new UnauthorizedException(e);
    // }
  }
  async signIn(userInfoDto: any) {
    if (!userInfoDto) throw new UnauthorizedException('EMPTY');
    const users = await Promise.all([
      Users.findOne({ where: { username: userInfoDto.username } }),
      Super_admin.findOne({ where: { username: userInfoDto.username } }),
    ]);
    const user = users.find((u) => u); // Get the first found user
    try {
      // Compare the hash password
      if (!user) {
        throw new UnauthorizedException('User doesnot exist');
      }
      const isMatch = await bcrypt.compare(userInfoDto.password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException('Invalid Password');
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
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
