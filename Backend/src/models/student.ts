import {DataTypes, InferAttributes, InferCreationAttributes, IntegerDataType, Model, NonAttribute} from 'sequelize';
import sequelize from "src/config/connection";


export default class Student extends Model<InferAttributes<Student>, InferCreationAttributes<Student>> {
    declare studentId: string;
    declare studentName: string;
    declare phoneNumber: string;
    declare userName?: NonAttribute<string>;

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



