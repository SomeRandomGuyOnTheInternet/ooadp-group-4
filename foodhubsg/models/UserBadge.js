const Sequelize = require('sequelize');
const db = require('../config/DBConfig');

const UserBadge = db.define('UserBadge');

module.exports = UserBadge;