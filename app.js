const Koa = require('koa');
const Router = require('koa-router');
const config = require('./config/index');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser')
const json = require('koa-json')
const cors = require('koa2-cors')
const app = new Koa();
const router = new Router();
// routes
// const user = require('./routes/user')
// const todo = require('./routes/todo')
require('./routes/user')(router)
require('./routes/todo')(router)

app.use(cors({
  origin: function(ctx){
    return "*";
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET','POST','PUT'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
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
// user(router);
// todo(router);

app.listen(config.port, () => {
  console.log(`app is run at 127.0.0.1:${config.port}`);
});