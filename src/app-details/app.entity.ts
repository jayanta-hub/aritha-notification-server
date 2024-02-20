import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'appdetails', timestamps: true })
export class Appdetails extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
  })
  id: string;

  @Column({ type: DataType.UUID })
  orgid: string;

  @Column({ type: DataType.STRING })
  appname: string;
}
