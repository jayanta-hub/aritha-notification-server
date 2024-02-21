import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'user_type', timestamps: true })
export class User_type extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  code: string;
}
