import { randomUUID } from "crypto";
const userId=randomUUID();
const orgId=randomUUID();
export const rolesSeedData=[
    {
      id: randomUUID(),
      title: 'SuperAdmin',
      slug: 'SUPERADMIN',
      description: 'SUPERADMIN',
    },
    {
      id: randomUUID(),
      title: 'OrgAdmin',
      slug: 'ORGADMIN',
      description: 'ORGADMIN',
    },
    {
      id: randomUUID(),
      title: 'OrgUser',
      slug: 'ORGUSER',
      description: 'ORGUSER',
    },
  ]
export const permissionsSeedData=[
    {
      id: randomUUID(),
      title: 'Create',
      slug: 'CREATE',
      description: 'Create Permission',
    },
    {
      id: randomUUID(),
      title: 'Read',
      slug: 'READ',
      description: 'Read Permission',
    },
    {
      id: randomUUID(),
      title: 'Update',
      slug: 'UPDATE',
      description: 'Update Permission',
    },
    {
      id: randomUUID(),
      title: 'Delete',
      slug: 'DELETE',
      description: 'Delete Permission',
    },
  ]
export const userTypeSeedData =[
    {
      id: randomUUID(),
      name: 'SUPERADMIN',
      code: 'SUPERADMIN',
    },
    {
      id: randomUUID(),
      name: 'ORGADMIN',
      code: 'ORGADMIN',
    },
    {
      id: randomUUID(),
      name: 'ORGUSER',
      code: 'ORGUSER',
    },
  ] 
 export const SuperAdminSeedData=[
    {
      id: randomUUID(),
      username: 'superadmin',
      firstname: 'superadmin',
      lastname: 'superadmin',
      email: 'superadmin.garu@gmail.com',
      phone: '1234567890',
      password: 'Test@123!',
    },
  ] 
export const usersSeedData=[
    {
      id: randomUUID(),
      username: 'admin',
      firstname: 'admin',
      lastname: 'admin',
      email: 'admin.garu@gmail.com',
      phone: '1234567890',
      password: 'Test@123!',
    },
  ] 
 export const OrgSeedData=[
    {
      id: orgId,
      username: 'Jayanta',
      password: 'Password@123',
      phone: '9898989898',
      email: 'jayanta.garu@gmail.com',
      orgname: 'JayantaHub',
      description: 'Jayanta hub',
    },
  ]
 export const AppdetailsSeedData=[
    {
      id: randomUUID(),
      orgid: orgId,
      appname: 'Netflix',
    },
    {
      id: randomUUID(),
      orgid: orgId,
      appname: 'Jio',
    },
    {
      id: randomUUID(),
      orgid: orgId,
      appname: 'Youtube',
    },
  ]
 export const UserRolesSeedData=[
    {
      id: randomUUID(),
      userid: userId,
      role: 'OrgUser',
      appname: 'Netflix',
      permission: ['CREATE','READ','UPDATE','DELETE'],
    },
  ]