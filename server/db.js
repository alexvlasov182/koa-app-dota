const Sequelize = require('sequelize');
const data = require('./db.json');

const dbString =
  process.env.DATABASE_URL ||
  'postgres://gdcaizikqpoyku:f108897522dcbd743faad936ee6974feeaf6e42f1d95ff6abd741367227ce02c@ec2-44-196-146-152.compute-1.amazonaws.com:5432/dbiev1k5m02g16';
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
