import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'user_role', timestamps: true })
export class Users_roles extends Model {
  [x: string]: any;
  @Column({
    primaryKey: true,
    type: DataType.UUID,
  })
  id: string;

  @Column({
    type: DataType.UUID,
  })
  userid: string;

  @Column({ type: DataType.STRING })
  role: string;

  @Column({ type: DataType.STRING })
  appname: string;

  @Column({ type: DataType.JSON })
  permission: string[];
}
// Users_roles.beforeSave((instance) => {
//   // Retrieve the user instance based on the current userid
//   const user = Users.findByPk(instance.userid);

//   if (user) {
//     // Update the userid with the value from the User model
//     instance.userid = user.id;
//   } else {
//     // Handle the case where the user is not found
//     console.error('User not found with id:', instance.userid);
//     // You might want to throw an error or take other corrective actions
//   }
// });
