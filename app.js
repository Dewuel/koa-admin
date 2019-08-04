const Koa = require('koa');
const Router = require('koa-router');
const config = require('./config/index');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser')
const json = require('koa-json')

// routes
const user = require('./routes/user')

const app = new Koa();
const router = new Router();

const port = process.env.PORT || config.port;
// require('./routes/index')(app)
app.use(bodyParser()).use(json())
mongoose.connect(config.mongodbURI, {
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  console.log('mongodb is connected!');
}).catch(err => {
  console.log(err);
})
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms} ms`)
})
app.use(router.routes()).use(router.allowedMethods());
user(router)

app.listen(port, () => {
  console.log(`app is run at 127.0.0.1:${port}`);
});