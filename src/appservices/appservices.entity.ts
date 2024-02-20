import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'services', timestamps: true })
export class Servicesdetails extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
  })
  id: string;

  @Column({ type: DataType.STRING })
  orgid: string;

  @Column({ type: DataType.JSON })
  servicesname: string;

  @Column({ type: DataType.JSON })
  providername: string;
}
