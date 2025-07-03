const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
}, {
  timestamps: false,
  tableName:'Roles'
});

module.exports = Role;
