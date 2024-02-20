import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Users_roles } from './user_role.entity';
import { Op } from 'sequelize';
@Injectable()
export class UserRolesService {
  private readonly logger = new Logger(UserRolesService.name);
  async createRoles(userInfoDto) {
    const User_role = userInfoDto?.appdetails.map((appdetails) => {
      return {
        id: randomUUID(),
        userid: userInfoDto?.userid,
        ...appdetails,
      };
    });
    try {
      const ExistingUser = await Users_roles.findAll({
        where: {
          userid: userInfoDto?.userid,
          appname: {
            [Op.in]: userInfoDto.appdetails.map((ad) => ad.appname),
          },
        },
      });
      console.log(
        '🚀 ~ UserRolesService ~ createRoles ~ ExistingUser:',
        ExistingUser,
      );
      if (ExistingUser.length > 0) {
        throw new Error('User already existing. Please try with a valid one.');
      }
      return await this.storeUserRoles(User_role);
    } catch (err) {
      this.logger.error(err);
      return new UnauthorizedException(err);
    }
  }
  async storeUserRoles(User_role) {
    try {
      return await Users_roles.bulkCreate(User_role, {
        returning: false,
      });
    } catch (err) {
      this.logger.error(err);
      return new UnauthorizedException(err);
    }
  }
}
