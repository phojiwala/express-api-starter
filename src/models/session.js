const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = require('../database');

const Session = sequelize.define('Session', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  token: DataTypes.STRING,
  csrfToken: DataTypes.STRING,
  status: DataTypes.STRING,
  deleted_at: DataTypes.DATE,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
});

Session.generateToken = async () => {
  // Implement token generation logic here
  return 'generated_token';
};

module.exports = Session;
