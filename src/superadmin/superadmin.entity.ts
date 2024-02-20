import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
