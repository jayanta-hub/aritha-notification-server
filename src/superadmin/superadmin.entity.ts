import { Column, DataType, Model, Table } from 'sequelize-typescript';
// import * as bcrypt from 'bcrypt';
@Table({ tableName: 'super_admin', timestamps: true })
export class Super_admin extends Model {
  [x: string]: any;
  @Column({
    primaryKey: true,
    type: DataType.UUID,
  })
  id: string;

  @Column({ type: DataType.STRING })
  firstname: string;

  @Column({ type: DataType.STRING })
  lastname: string;

  @Column({ type: DataType.STRING })
  username: string;

  @Column({ type: DataType.STRING })
  password: string;

  @Column({ type: DataType.STRING })
  email: string;

  @Column({ type: DataType.STRING })
  phone: string;
}
// Super_admin.beforeCreate(async (user, options) => {
//   const saltOrRounds = 10;
//   const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);
//   user.password = hashedPassword;
// });
