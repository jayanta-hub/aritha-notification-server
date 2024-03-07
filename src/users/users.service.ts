/* eslint-disable @typescript-eslint/no-unused-vars */
import { Op } from 'sequelize';
import { DeleteUser, UserId } from 'src/auth/dto/auth-interface';
import { Users } from 'src/auth/authusers.entity';
import { Org } from 'src/org/ogr.entity';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { ErrorMessage } from 'src/utils/helper';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Users_roles } from 'src/user_roles/user_role.entity';
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {
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
      ErrorMessage('Something went wrong');
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
      ErrorMessage(e);
    }
  }
  async get() {
    try {
      await this.cacheManager.set('as', { key: 32 });
      // await this.cacheManager.del('cached_item');
      // await this.cacheManager.reset();
      const cachedItem = await this.cacheManager.get('as');
      console.log('cachedItem', cachedItem);
      return 'the';
    } catch (e) {
      console.log('🚀 ~ UserService ~ get ~ e:', e);
    }
  }
}
