const { Sequelize, DataTypes, Op } = require('sequelize');
const Session = require('../models/session');

const initSession = async (userId) => {
  const token = await Session.generateToken();
  const csrfToken = await Session.generateToken();
  const session = new Session({ token, csrfToken, userId });
  await session.save();
  return session;
};

export const sequelize = new Sequelize('crud_demo', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});