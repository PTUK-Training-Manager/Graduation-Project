
import { DataTypes, Model, InferAttributes,InferCreationAttributes, NonAttribute} from 'sequelize';
import db from '../config/connection';

// interface UserAttributes {
//   username:string,
//   email:string,
//   password:string
// }

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>{
  declare username:any;
  declare email:any;
  declare password:any;
  declare RoleId?:NonAttribute<number>;
}

User.init({
  username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
    }, {
      sequelize: db,
      modelName: 'User',
      timestamps:false 
    });