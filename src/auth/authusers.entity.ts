import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: true })
export class Users extends Model {
  [x: string]: any;
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    // defaultValue: DataType.UUIDV4,
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

  @Column({ type: DataType.UUID })
  orgid: string;
}
