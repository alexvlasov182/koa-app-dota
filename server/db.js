const Sequelize = require('sequelize');
const data = require('./db.json');

const dbString = process.env.DATABASE_URL || '';
const ssl = !!process.env.DATABASE_URL;
const db = new Sequelize(dbString, { dialectOptions: { ssl } });

const Dota = db.define('dota', {
  title: Sequelize.STRING,
  content: Sequelize.TEXT,
  image: Sequelize.STRING,
});

db.sync({ force: true }).then(() => {
  data.forEach((e) => Dota.create(e));
});

module.exports = {
  db,
  Dota,
};
