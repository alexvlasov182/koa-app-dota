const Sequelize = require('sequelize');
const data = require('./db.json');

const dbString =
  process.env.DATABASE_URL ||
  'postgres://qhtalimbpstjak:88248d115f3c9ec34efa52c17287f73fedecd2185bf9002da1a18337769769c1@ec2-3-230-61-252.compute-1.amazonaws.com:5432/dd0ml79lve1vs6';
const ssl = !!process.env.DATABASE_URL;
const db = new Sequelize(dbString, { dialectOptions: { ssl: true } });

const Dota = db.define('dota', {
  title: Sequelize.STRING,
  content: Sequelize.TEXT,
  image: Sequelize.STRING,
});

db.sync({ force: true }).then(() => {
  data.forEach((dota) => Dota.create(dota));
});

module.exports = {
  db,
  Dota,
};
