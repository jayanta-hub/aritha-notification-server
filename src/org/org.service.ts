import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Org } from './ogr.entity';
// import { Users } from 'src/auth/users.entity';
import { randomUUID } from 'crypto';
// import { Roles } from 'src/role/roles.entity';
import * as bcrypt from 'bcrypt';
// import { Appdetails } from 'src/appDetails/app.entity';

@Injectable()
export class OrgService {
  private readonly logger = new Logger(OrgService.name);
  async orgSignUp(userInfoDto: any) {
    console.log('🚀 ~ OrgService ~ orgSignUp ~ userInfoDto:', userInfoDto);
    try {
      // const role = await Roles.findOne({
      //   where: {
      //     slug: 'ADMIN',
      //   },
      // });
      // if (!role) {
      //   throw new UnauthorizedException(
      //     'No role found. Please try with a valid role.',
      //   );
      // }
      const ExsitingOrgUser = await Org.findOne({
        where: {
          orgname: userInfoDto?.orgname,
        },
      });
      if (ExsitingOrgUser) {
        throw new Error(
          'Organization Name is existing. Please try with another Organization Name.',
        );
      }
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(userInfoDto.password, saltOrRounds);
      userInfoDto['id'] = randomUUID();
      userInfoDto['password'] = hash;
      // const appObj = userInfoDto.appdetails.map((e) => ({
      //   id: randomUUID(),
      //   appdetails: e?.appname,
      //   orgid: userInfoDto?.id,
      //   userid: userInfoDto?.id,
      // }));

      // const userObj = {
      //   id: userInfoDto?.id,
      //   username: userInfoDto?.username,
      //   password: userInfoDto?.password,
      //   email: userInfoDto?.email,
      //   phone: userInfoDto?.phone,
      //   usertype: 'ADMIN',
      //   orgid: userInfoDto?.id,
      //   roleid: role?.id,
      // };
      // await Appdetails.bulkCreate(appObj, {
      //   returning: false,
      // });
      const orgObj = {
        id: userInfoDto?.id,
        orgname: userInfoDto?.orgname,
        description: userInfoDto?.description,
      };
      const orgReps = await Org.create(orgObj, {
        returning: false,
      });
      // await Users.create(userObj, {
      //   returning: false,
      // });

      // To Do  return successful message
      return orgReps;
    } catch (e) {
      this.logger.error(e);
      return new UnauthorizedException(e);
    }
  }
}
