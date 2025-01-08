const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Influencer = sequelize.define('Influencer', {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  platform: { type: DataTypes.STRING, allowNull: false },
  followers: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  bio: { type: DataTypes.TEXT },
  profileImage: { type: DataTypes.STRING },
  reliabilityScore: { type: DataTypes.FLOAT, defaultValue: 0.0 },
});

module.exports = Influencer;
