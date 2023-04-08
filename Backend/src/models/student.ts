import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, IntegerDataType, Model, NonAttribute } from 'sequelize';
import sequelize from "src/config/connection";
import User from './user';


export default class Student extends Model<InferAttributes<Student>, InferCreationAttributes<Student>> {
    declare studentId: string;
    declare studentName: string;
    declare phoneNumber: string;
    declare userId: ForeignKey<User['id']>;

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
    sequelize,
    modelName: 'Student',
    timestamps: false
});


