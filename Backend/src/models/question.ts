import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, IntegerDataType, Model, NonAttribute } from 'sequelize';
import sequelize from "src/config/connection";
import Role from './role';


export default class Question extends Model<InferAttributes<Question>, InferCreationAttributes<Question>> {
declare questionId: CreationOptional<number>;
declare question:string;
declare isMultipleChoice: boolean;
declare roleId: ForeignKey<Role['id']>;

}

Question.init({
    questionId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    question: {
    type: DataTypes.STRING,  
    allowNull: false
    },
    isMultipleChoice:{
     type: DataTypes.BOOLEAN,
     allowNull: false   
    }},
    {
    sequelize,
    modelName: 'Question',
    timestamps:false  
    });