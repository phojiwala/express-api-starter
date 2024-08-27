const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('crud_demo', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;