import { Sequelize } from 'sequelize';

const db = new Sequelize('test', 'root', 'haneen', {
    host:'localhost',
	dialect: 'mysql'
	
});

export default db;