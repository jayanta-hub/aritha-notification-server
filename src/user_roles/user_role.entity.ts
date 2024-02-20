import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'user_role', timestamps: true })
export class Users_roles extends Model {
  [x: string]: any;
  @Column({
    primaryKey: true,
    type: DataType.UUID,
  })
  id: string;

  @Column({ type: DataType.STRING })
  userid: string;

  @Column({ type: DataType.STRING })
  role: string;

  @Column({ type: DataType.STRING })
  appname: string;

  @Column({ type: DataType.JSON })
  permission: string[];
}
