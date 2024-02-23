/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Op } from 'sequelize';
import { DeleteUser, UserId } from 'src/auth/dto/auth-interface';
import { Users } from 'src/auth/authusers.entity';
import { Org } from 'src/org/ogr.entity';
import { Users_roles } from 'src/user_roles/user_role.entity';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor() {
    //
  }
  async getAll() {
    const result = await Users.findAll();
    return result;
  }

  async deleteById(id: DeleteUser) {
    try {
      await Users.destroy({
        where: {
          id: {
            [Op.eq]: id.id,
          },
        },
      });
      return {
        message: `Delete successful.`,
      };
    } catch (error) {
      throw new UnauthorizedException('Something went wrong');
    }
  }
  async userProfile(UserId: UserId) {
    const result = await Users.findOne({
      where: {
        id: UserId.id,
      },
    });
    const AppDetails = await Users_roles.findAll({
      where: {
        userid: UserId.id,
      },
    });
    const appname = [];
    const appDetails = AppDetails?.map((app) => {
      appname.push(app.appname);
      return {
        appname: app.appname,
        role: app.role,
        permission: app.permission,
      };
    });
    const user = {
      id: result.id,
      firstname: result.firstname,
      lastname: result.lastname,
      username: result.username,
      email: result.email,
      phone: result.phone,
      orgid: result.orgid,
      appname,
      appDetails: appDetails || [],
    };
    return user;
  }
  async createUser(userInfoDto: any) {
    try {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(userInfoDto.password, saltOrRounds);
      userInfoDto['id'] = randomUUID();
      userInfoDto['password'] = hash;
      const orgExists = await Org.findOne({
        where: { id: userInfoDto?.orgid },
      });
      if (!orgExists) {
        throw new Error('Invalid organization ID');
      }
      const [_, created] = await Users.findOrCreate({
        where: {
          username: userInfoDto.username,
        },
        defaults: userInfoDto,
      });
      if (created) {
        return {
          message: `Create successful.`,
        };
      } else {
        throw new Error('user is existing. Please try with another UserName.');
      }
    } catch (e) {
      this.logger.error(e);
      return new UnauthorizedException(e);
    }
  }
}
