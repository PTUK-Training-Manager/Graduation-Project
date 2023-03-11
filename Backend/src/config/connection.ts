import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize('bplcrr8zwatwvazwoype', 'uauhcsf7kelziuru', 'vbn3DPUnphxcfDMx00D1', {
    host: 'bplcrr8zwatwvazwoype-mysql.services.clever-cloud.com',
    dialect: 'mysql',
});


export default sequelize;