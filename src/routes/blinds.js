const express = require('express');
const router = express.Router();
const { DataTypes, Op } = require('sequelize');
const { faker } = require('@faker-js/faker');
const sequelize = require('../database');

const Blind = sequelize.define('Blind', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  season: DataTypes.STRING,
  user_id: DataTypes.INTEGER,
  blind_type: DataTypes.STRING,
  blind_prior_year_status: DataTypes.STRING,
  description: DataTypes.TEXT,
  longitude: DataTypes.STRING,
  latitude: DataTypes.STRING,
  status: DataTypes.STRING,
  deleted_at: DataTypes.DATE,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  full_name: DataTypes.STRING,
  license_status: DataTypes.STRING,
  image: DataTypes.STRING,
  allImages: DataTypes.STRING
});

sequelize.sync();

// const generateSampleData = async () => {
//   const blindTypes = ['Bush', 'Tree', 'Ground'];
//   const statuses = ['Active', 'Inactive'];
//   const licenseStatuses = ['Licensed', 'Unlicensed'];

//   for (let i = 0; i < 15; i++) {
//     await Blind.create({
//       season: `${2025 + Math.floor(i / 2)}-${2026 + Math.floor(i / 2)}`,
//       user_id: faker.datatype.number({ min: 100, max: 200 }),
//       blind_type: blindTypes[Math.floor(Math.random() * blindTypes.length)],
//       blind_prior_year_status: Math.random() > 0.5 ? 'Free' : 'Occupied',
//       description: faker.lorem.paragraphs(3),
//       longitude: faker.address.longitude(),
//       latitude: faker.address.latitude(),
//       status: statuses[Math.floor(Math.random() * statuses.length)],
//       deleted_at: null,
//       created_at: faker.date.past(),
//       updated_at: faker.date.recent(),
//       full_name: faker.name.fullName(),
//       license_status: licenseStatuses[Math.floor(Math.random() * licenseStatuses.length)],
//       image: null,
//       allImages: null
//     });
//   }
// };
// generateSampleData();

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    const sortField = req.query.sortField || 'id';
    const sortOrder = req.query.sortOrder === 'desc' ? 'DESC' : 'ASC';

    const { count, rows } = await Blind.findAndCountAll({
      where: {
        [Op.or]: [
          { full_name: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } },
          { blind_type: { [Op.like]: `%${search}%` } }
        ]
      },
      order: [[sortField, sortOrder]],
      limit: limit,
      offset: offset
    });

    res.json({
      total: count,
      page: page,
      limit: limit,
      data: rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;