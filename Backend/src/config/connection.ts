import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';
// dotenv.config();
const db=process.env.DB_NAME?.toString() as Secret;
const username= process.env.DB_USER?.toString() as Secret;
const password= process.env.DB_PASSWORD?.toString() as Secret;

const sequelize = new Sequelize(db?.toString(), username?.toString(), password?.toString(), {
    host:process.env.HOST,
    dialect: 'mysql',
});


export default sequelize;