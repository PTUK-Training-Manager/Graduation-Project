import { DataTypes, InferAttributes, InferCreationAttributes, IntegerDataType, Model, NonAttribute } from 'sequelize';
import db from '../config/connection';

// interface StudentAttributes {
//   studentId:IntegerDataType,
//   studentName:string,
//   phoneNumber:string,
  
// }

 export class Student extends Model<InferAttributes<Student>, InferCreationAttributes<Student>> {
declare studentId: string;
declare studentName:string;
declare phoneNumber:string;
declare userName?:NonAttribute<string>;

 }

Student.init({
  studentId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      studentName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      sequelize: db,
      modelName: 'Student',
      timestamps:false 
    });



