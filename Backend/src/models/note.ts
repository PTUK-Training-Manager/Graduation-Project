import { Association, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, IntegerDataType, Model } from 'sequelize';
import sequelize from "src/config/connection";


// interface NoteAttributes {
//   NoteID:IntegerDataType,
//   note:string
// }

export default class Note extends Model<InferAttributes<Note>, InferCreationAttributes<Note>>{
  declare noteId: CreationOptional<number>;
declare note:string;
}

Note.init({
    noteId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    note: {
    type: DataTypes.STRING,  
    allowNull: false
    }},
    {
    sequelize,
    modelName: 'Note',
    timestamps:false  
    });