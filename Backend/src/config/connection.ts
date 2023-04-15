import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const HOST_ENDPOINT = process.env.DB_HOST_ENDPOINT!,
    DATABASE = process.env.DB_NAME!,
    USERNAME = process.env.DB_USER!,
    PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
    host: HOST_ENDPOINT,
    dialect: 'mysql',
});

export default sequelize;