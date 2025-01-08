const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Influencer = require('./Influencer');

const Claim = sequelize.define('Claim', {
  text: { type: DataTypes.TEXT, allowNull: false },
  category: { type: DataTypes.STRING }, // Nutrição, Psicologia, etc.
  isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
  confidence: { type: DataTypes.FLOAT, defaultValue: 0.0 },
});

Influencer.hasMany(Claim, { foreignKey: 'influencerId' });
Claim.belongsTo(Influencer, { foreignKey: 'influencerId' });

module.exports = Claim;
