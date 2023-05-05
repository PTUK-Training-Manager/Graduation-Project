import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from "../config/connection";

export default class Field extends Model<InferAttributes<Field>, InferCreationAttributes<Field>> {
    declare id: CreationOptional<number>;
    declare field: string;
}
Field.init({
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
        modelName: 'Field',
        timestamps: false
    });