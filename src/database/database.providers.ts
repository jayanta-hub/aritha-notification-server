import { Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Users } from '../auth/authusers.entity';
import { Roles } from '../role/roles.entity';
import { Org } from 'src/org/ogr.entity';
import { Appdetails } from 'src/app-details/app.entity';
import { Permission } from 'src/permission/permission.entity';
import { Users_roles } from 'src/user_roles/user_role.entity';
import { Super_admin } from 'src/superadmin/superadmin.entity';
import { User_type } from 'src/usertype/userType.entity';
import { Car } from 'src/car/car.entity';

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
        Car,
      ]);

      Users.afterCreate(() => {
        console.log('first');
      });

      // * Add Relation
      addRelations();

      await sequelize.sync(); //{ force: true, alter: true }
      // seed data insert ot bd
      seedData();
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
        .then(() => this.logger.debug('Database connection successful.'))
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
function seedData() {
  import('../data/userType.json')
    .then(async (d) => {
      const data = await User_type.findAll();
      !data.length && User_type.bulkCreate(d);
    })
    .catch(console.error);
  import('../data/role.json')
    .then(async (d) => {
      const data = await Roles.findAll();
      !data.length && Roles.bulkCreate(d);
    })
    .catch(console.error);
  import('../data/permission.json')
    .then(async (d) => {
      const data = await Permission.findAll();
      !data.length && Permission.bulkCreate(d);
    })
    .catch(console.error);
  import('../data/org.json')
    .then(async (d) => {
      const data = await Org.findAll();
      !data.length && Org.bulkCreate(d);
    })
    .catch(console.error);
  import('../data/car.json')
    .then(async (d) => {
      const data = await Car.findAll();
      !data.length && Car.bulkCreate(d);
    })
    .catch(console.error);
}
