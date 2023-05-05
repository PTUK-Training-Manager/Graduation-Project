import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from "../config/connection";
import { Field, Company } from '.';

export default class CompanyField extends Model<InferAttributes<CompanyField>, InferCreationAttributes<CompanyField>> {
    declare id: CreationOptional<number>;
    declare companyId: ForeignKey<Company['id']>;
    declare fieldId: ForeignKey<Field['id']>;
}
CompanyField.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    }
},
    {
        sequelize,
        modelName: 'CompanyField',
        timestamps: false
    });