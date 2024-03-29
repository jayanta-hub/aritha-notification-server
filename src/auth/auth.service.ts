import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { Users } from './users.entity';
import { randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Roles } from 'src/role/roles.entity';
import { Org } from 'src/org/ogr.entity';
import { UserRolesService } from 'src/user_roles/user_roles.service';
import { Users_roles } from 'src/user_roles/user_role.entity';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private jwtService: JwtService,
    private userRoleService: UserRolesService,
  ) {
    //
  }

  async signUp(userInfoDto: any) {
    try {
      const ExsitingUser = await Users.findOne({
        where: {
          username: userInfoDto.username,
        },
      });
      if (!ExsitingUser) {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(userInfoDto.password, saltOrRounds);
        userInfoDto['id'] = randomUUID();
        userInfoDto['password'] = hash;
        const UserInfo = {
          id: userInfoDto?.id,
          username: userInfoDto?.username,
          password: userInfoDto?.password,
          firstname: userInfoDto?.firstname,
          lastname: userInfoDto?.lastname,
          phone: userInfoDto?.phone,
          email: userInfoDto?.email,
          orgid: userInfoDto?.orgid,
        };
        const orgExists = await Org.findOne({
          where: { id: userInfoDto?.orgid },
        });
        if (!orgExists) {
          throw new Error('Invalid organization ID');
        }
        const result = await Users.create(UserInfo, {
          returning: false,
        });
        // To Do  return successful message
        const User_role = userInfoDto?.appdetails.map((e) => {
          return {
            id: randomUUID(),
            userid: userInfoDto?.id,
            role: e?.role,
            permission: e?.permission,
            appname: e?.appname,
          };
        });
        await this.userRoleService.storeUserRoles(User_role);
        return result;
      } else {
        throw new Error('user is existing. Please try with another UserName.');
      }
    } catch (e) {
      this.logger.error(e);
      return new UnauthorizedException(e);
    }
  }
  async signIn(userInfoDto: any) {
    if (!userInfoDto) throw new UnauthorizedException('EMPTY');
    try {
      const user = await Users.findOne({
        where: {
          username: userInfoDto.username,
        },
      });
      // Compare the hash password

      if (!user) {
        throw new UnauthorizedException('User doesnot exist');
      }
      const isMatch = await bcrypt.compare(userInfoDto.password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = {
        sub: user.password,
        username: user.username,
      };
      const accessToken = await this.jwtService.signAsync(payload);
      const isSuperAdmin = await Users_roles.findAll({
        where: {
          userid: user.id,
        },
      });
      const a = isSuperAdmin.filter((e) => e.role === 'SuperAdmin');
      return {
        status: 200,
        data: {
          userId: user?.id,
          username: user?.username,
          password: user?.password,
          orgid: user?.orgid,
          access_token: accessToken,
          isSuperAdmin: a.length > 0 ? true : false,
        },
        message: 'Login successful',
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
  async userProfile(userProfileDto: any) {
    console.log('first', userProfileDto);
  }
}
