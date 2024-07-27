import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'org', timestamps: true })
export class Org extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ type: DataType.STRING })
  orgname: string;

  @Column({ type: DataType.STRING })
  email: string;

  @Column({ type: DataType.STRING })
  description: string;
}
