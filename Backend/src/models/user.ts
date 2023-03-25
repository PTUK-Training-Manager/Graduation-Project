
import { DataTypes, Model, InferAttributes,InferCreationAttributes, NonAttribute} from 'sequelize';
import db from '../config/connection';

// interface UserAttributes {
//   username:string,
//   email:string,
//   password:string
// }

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>{
  declare username: string;
  declare email: string;
  declare password: string;
  declare roleId?: number;
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