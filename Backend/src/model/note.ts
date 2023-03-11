import { DataTypes, Model } from 'sequelize';
import db from '../config/connection';


interface NoteAttributes {
  NoteID:number,
  note:string
}

export class Note extends Model<NoteAttributes> {}

Note.init({
    NoteID: {
      type: DataTypes.NUMBER,
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