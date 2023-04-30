import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from "../config/connection";
import Company from './Company';

export default class CompanyField extends Model<InferAttributes<CompanyField>, InferCreationAttributes<CompanyField>> {
    declare id: CreationOptional<number>;
    declare companyId: ForeignKey<Company['id']>;
    declare field: string;
}
CompanyField.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        field: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'CompanyField',
        timestamps: false
    });