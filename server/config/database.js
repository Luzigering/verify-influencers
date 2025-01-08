const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,       // Nome do banco
  process.env.DB_USER,       // Usuário
  process.env.DB_PASS,       // Senha
  {
    host: process.env.DB_HOST || 'localhost', // Host
    port: process.env.DB_PORT || 3306,        // Porta
    dialect: 'mysql',  
    dialectOptions: {
      charset: 'utf8mb4',
    },                       // Dialeto
    logging: false,
  }
);

module.exports = sequelize;
