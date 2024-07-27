import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'car',
  timestamps: true,
  indexes: [{ fields: ['car_brand'] }],
})
export class Car extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ type: DataType.STRING })
  car_brand: string;

  @Column({ type: DataType.STRING })
  car_modal: string;

  @Column({ type: DataType.STRING })
  car_year: string;
}
