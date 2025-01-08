const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Influencer = require('./Influencer');

const Metric = sequelize.define('Metric', {
  correctClaims: { type: DataTypes.INTEGER, defaultValue: 0 },
  totalClaims: { type: DataTypes.INTEGER, defaultValue: 0 },
  influencerId: { type: DataTypes.INTEGER, allowNull: false },
});

Metric.belongsTo(Influencer, { foreignKey: 'influencerId' });

module.exports = Metric;
