import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'permission', timestamps: true })
export class Permission extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ type: DataType.STRING })
  title: string;

  @Column({ type: DataType.STRING })
  slug: string;

  @Column({ type: DataType.STRING })
  description: string;
}
