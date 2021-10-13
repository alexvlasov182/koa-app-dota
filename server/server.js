const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-body')();
const logger = require('koa-morgan');
const serve = require('koa-static');
const { Dota } = require('./db');

const port = process.env.PORT || 3003;
const server = new Koa();
const router = new Router();

router.get('/learn', async (ctx) => {
  const collection = await Dota.findAll();
  const index = Math.floor(collection.length * Math.random());
  console.log(collection);
  const dota = collection[index];
  ctx.body = dota;
});

server.use(logger('tiny')).use(serve('public')).use(router.routes()).listen(port);
