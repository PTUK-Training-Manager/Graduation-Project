import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, IntegerDataType, Model } from 'sequelize';
import sequelize from "../config/connection";
import Company from './Company';

export default class CompanyBranch extends Model<InferAttributes<CompanyBranch>, InferCreationAttributes<CompanyBranch>> {
    declare id: CreationOptional<number>;
    declare companyId: ForeignKey<Company['id']>;
    declare location: string;
}
CompanyBranch.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        sequelize,
        modelName: 'CompanyBranch',
        timestamps: false
    });