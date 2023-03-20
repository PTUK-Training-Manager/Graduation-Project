import { Association, DataTypes, InferAttributes, InferCreationAttributes, IntegerDataType, Model } from 'sequelize';
import db from '../config/connection';


// interface NoteAttributes {
//   NoteID:IntegerDataType,
//   note:string
// }

export class Note extends Model<InferAttributes<Note>, InferCreationAttributes<Note>>{
  declare noteId: number;
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
    sequelize: db,
    modelName: 'Note',
    timestamps:false  
    });