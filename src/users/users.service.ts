/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Op } from 'sequelize';
import { DeleteUser, UserId } from 'src/auth/dto/auth-interface';
import { Users } from 'src/auth/users.entity';
import { Org } from 'src/org/ogr.entity';
import { Users_roles } from 'src/user_roles/user_role.entity';

@Injectable()
export class UserService {
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
}
