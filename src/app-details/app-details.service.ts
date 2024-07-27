import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Appdetails } from './app.entity';
import { Op } from 'sequelize';
import { randomUUID } from 'crypto';
import { Org } from 'src/org/ogr.entity';

@Injectable()
export class AppDetailsService {
  private readonly logger = new Logger(AppDetailsService.name);
  async createApp(appInfo: any): Promise<any> {
    try {
      console.log(
        '🚀 ~ AppDetailsService ~ createApp ~ appInfo?.orgid:',
        appInfo?.orgid,
      );
      const isOrgIdExist = await Org.findOne({ where: { id: appInfo?.orgid } });
      console.log(
        '🚀 ~ AppDetailsService ~ createApp ~ isOrgIdExist:',
        isOrgIdExist,
      );
      if (isOrgIdExist) {
        const ExistingApp = await Appdetails.findAll({
          where: {
            orgid: appInfo?.orgid,
            appname: {
              [Op.in]: appInfo?.appname,
            },
          },
        });
        if (ExistingApp.length > 0) {
          const isAppPresentr = ExistingApp.filter((element) =>
            appInfo?.appname.includes(element.appname),
          );
          const listOfexistingApp = isAppPresentr.map((element) => {
            return element.appname;
          });
          if (listOfexistingApp?.length > 0) {
            throw new Error(
              `App Name '${listOfexistingApp.join(' ').toString()}' is existing. Please choose unique names.`,
            );
          }
        } else {
          const appObj = appInfo.appname.map((e) => ({
            id: randomUUID(),
            appname: e,
            orgid: appInfo?.orgid,
          }));
          const result = await Appdetails.bulkCreate(appObj, {
            returning: false,
          });
          // To Do  return successful message
          return result;
        }
      } else {
        return new UnauthorizedException("Org Id doesn't exist");
      }
    } catch (e) {
      this.logger.error(e);
      return new UnauthorizedException(e);
    }
  }
}
