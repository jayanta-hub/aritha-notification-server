import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Roles } from './roles.entity';

@Injectable()
export class RolesService {
  private readonly logger = new Logger(RolesService.name);
  async getRoles() {
    const result = await Roles.findAll();
    const roleObj = result.map((role) => ({
      roleName: role?.title,
      roleCode: role?.slug,
      description: role?.description,
    }));
    return roleObj;
  }
  async createRole(rolesInfoDto: any) {
    try {
      const ExsitingUser = await Roles.findOne({
        where: {
          title: rolesInfoDto.title,
        },
      });

      if (
        !ExsitingUser &&
        ![ExsitingUser].some((e) => e?.title === rolesInfoDto?.title)
      ) {
        const result = await Roles.create(rolesInfoDto, {
          returning: false,
        });
        // To Do  return successful message
        return result;
      } else {
        return new UnauthorizedException(
          'Roles is existing. Please try with another Roles.',
        );
      }
    } catch (e) {
      this.logger.error(e);
      return new UnauthorizedException(e);
    }
  }
}
