const Sequelize = require('sequelize');

const connect = new Sequelize('postgres', '', '', {
  host: 'localhost',
  port: 5433,
  dialect: 'postgres',
});

const dbString = process.env.DATABASE_URL || connect;
const ssl = !!process.env.DATABASE_URL;
const db = new Sequelize(dbString, { dialectOptions: { ssl } });

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
