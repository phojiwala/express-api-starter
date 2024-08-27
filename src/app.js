const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const authRoutes = require('./routes/auth');
const { authenticateToken } = require('./middlewares');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');
const items = require('./routes/items');
const blinds = require('./routes/blinds');
const sequelize = require('./database');
const app = express();

sequelize.sync({ force: false }).then(() => {
  console.log("Database & tables created!");
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(authRoutes);

app.use('/items', items);
app.use('/blinds', blinds);

app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

app.get('/test', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.get('/products/cateogies', (req, res) => {
  res.json(
    ['cars', 'trucks', 'planes']
  );
});

app.use('/api/v1', api);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
