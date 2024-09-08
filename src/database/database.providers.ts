import { Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Users } from '../auth/users.entity';
import { Roles } from '../role/roles.entity';
import { Org } from 'src/org/ogr.entity';
import { Appdetails } from 'src/app-details/app.entity';
import { Permission } from 'src/permission/permission.entity';
import { Users_roles } from 'src/user_roles/user_role.entity';
import { Super_admin } from 'src/superadmin/superadmin.entity';
import { User_type } from 'src/usertype/userType.entity';
import { AppdetailsSeedData, OrgSeedData, permissionsSeedData, rolesSeedData, SuperAdminSeedData, UserRolesSeedData, usersSeedData, userTypeSeedData } from 'src/utils/seed/seed';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = await new Database().init();

      // * Add models
      sequelize.addModels([
        Users,
        Roles,
        Org,
        Appdetails,
        Permission,
        Users_roles,
        Super_admin,
        User_type,
      ]);

      // sequelize.beforeCreate(function (model) {
      //   console.log('🚀 ~ model:', model);
      //   model.set('id', randomUUID());
      // });

      // * Add Relation
      addRelations();
      // * Seeding
      seeding();
      await sequelize.sync(); //{ force: true, alter: true }
      return sequelize;
    },
  },
];

@Injectable()
export class Database {
  private readonly logger = new Logger(Database.name);
  private db: Sequelize;

  async init() {
    try {
      this.db = new Sequelize({
        dialect: 'mysql',
        host: process.env.HOST,
        port: 3306,
        username: process.env.USER_NAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
      });
      this.db
        .authenticate()
        .then(() => this.logger.debug(`Database connection successful`))
        .catch((e) => {
          console.log('error', e);
        });
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      this.logger.debug('Database connection fail.');
    }
    return this.db;
  }
}

function addRelations() {
  Users.belongsTo(Org, { foreignKey: 'orgid', targetKey: 'id' });
  Users_roles.belongsTo(Users, { foreignKey: 'userid', targetKey: 'id' });
  Users_roles.belongsTo(Roles, { foreignKey: 'role', targetKey: 'title' });
  Appdetails.belongsTo(Org, { foreignKey: 'orgid', targetKey: 'id' });
}

   /**
    * Seeds the database with initial data.
    *
    * This function creates records in the database for roles, permissions, user types, super admins, organizations,
    * application details, users, and user roles using the provided seed data.
    *
    */
   
 function seeding() {
    Roles.bulkCreate(rolesSeedData);
    Permission.bulkCreate(permissionsSeedData);
    User_type.bulkCreate(userTypeSeedData);
    Super_admin.bulkCreate(SuperAdminSeedData);
    Org.bulkCreate(OrgSeedData);
    Appdetails.bulkCreate(AppdetailsSeedData);
    Users.bulkCreate(usersSeedData);
    Users_roles.bulkCreate(UserRolesSeedData);
}