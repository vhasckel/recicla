import { Sequelize } from 'sequelize';
import pg from 'pg';

console.log('DATABASE_URL:', process.env.DATABASE_URL);

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
    dialect: 'postgres',
    dialectModule: pg,
    native: false,
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

async function connectToDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        await sequelize.sync();
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error);
        throw error;
    }
}

export { sequelize, connectToDatabase }; 