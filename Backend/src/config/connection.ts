import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('test', 'root', 'shahd!A2002', {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;