const sequelize = require('../config/database');
const Influencer = require('../models/Influencer');
const Claim = require('../models/Claim');
const Metric = require('../models/Metric');
require('dotenv').config();

const syncDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('Database synced successfully');
};

syncDatabase();

