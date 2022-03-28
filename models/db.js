//Módulo de conexão com banco de bados
const Sequelize = require('sequelize');

//Conexão com banco de dados MySql
const sequelize = new Sequelize('bdpostapp', 'root', '1234', {
    host: "localhost",
    dialect: 'mysql',
    port: 8081
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}