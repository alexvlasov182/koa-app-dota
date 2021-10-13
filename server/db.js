const Sequelize = require('sequelize');

const dbString = process.env.DATABASE_URL || 'postgres://localhost:5433/postgres';
const ssl = !!process.env.DATABASE_URL;
const db = new Sequelize(dbString, { dialectOptions: { ssl: true } });

const Dota = db.define('dota', {
  title: Sequelize.STRING,
  content: Sequelize.TEXT,
  image: Sequelize.STRING,
});

db.sync();

module.exports = {
  db,
  Dota,
};
