import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'roles', timestamps: true })
export class Roles extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ type: DataType.STRING, unique: true })
  title: string;

  @Column({ type: DataType.STRING })
  slug: string;

  @Column({ type: DataType.STRING })
  description: string;
}
