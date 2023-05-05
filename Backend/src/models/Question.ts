import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    IntegerDataType,
    Model,
    NonAttribute
} from 'sequelize';
import sequelize from "../config/connection";
import Role from './Role';


export default class Question extends Model<InferAttributes<Question>, InferCreationAttributes<Question>> {
    declare id: CreationOptional<number>;
    declare question: string;
    declare isMultipleChoice: boolean;
    declare roleId: ForeignKey<Role['id']>;
}

Question.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    question: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isMultipleChoice: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},
    {
        sequelize,
        modelName: 'Question',
        timestamps: false
    });