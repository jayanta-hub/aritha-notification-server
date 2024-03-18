/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { OrgService } from 'src/org/org.service';
import { SuperadminService } from 'src/superadmin/superadmin.service';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthFactoryService {
  constructor(
    @Inject(forwardRef(() => SuperadminService))
    private superAdminService: SuperadminService,
    @Inject(forwardRef(() => OrgService))
    private orgService: OrgService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {
    //
  }

  getService(type: string, data: any) {
    switch (type) {
      case 'SUPERADMIN':
        return this.superAdminService.superadminsignUp(data);
      case 'ORGADMIN':
        return this.orgService.orgSignUp(data);
      case 'ORGUSER':
      default:
        return this.userService.createUser(data);
    }
  }
}
