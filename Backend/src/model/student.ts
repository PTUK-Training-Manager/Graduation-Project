import { DataTypes, Model } from 'sequelize';
import db from '../config/connection';


interface StudentAttributes {
  studentId:string,
  studentName:string,
  phoneNumber:string
}

 export class Student extends Model<StudentAttributes> {}

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



