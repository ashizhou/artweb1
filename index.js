const koa = require("koa");   //node framework
const path = require("path");  
const bodyParser = require("koa-bodyparser"); //koa middleware bodyparser
const ejs = require("ejs");   //Front: ejs
const session = require("koa-session-minimal");   //middleware sql
const MysqlStore = require("koa-mysql-session");  //middleware sql
const router = require("koa-router");     //middleware router
const config = require('./config/default.js');    //middleware sql config
const views = require("koa-views");   //middleware views
const koaStatic = require("koa-static");  //middleware static file serving (image uploading)
const staticCache = require('koa-static-cache')
const multer = require('koa-multer')
const app = new koa();

//session storage
const sessionMysqlConfig = {
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST,
}


//middleware session config
app.use(session({
    key: 'USER_SID',
    store: new MysqlStore(sessionMysqlConfig)
}))


//middleware static 
app.use(koaStatic(
    path.join(__dirname , './public')
))

//ejs config
app.use(views(path.join(__dirname, './views'),{
    extension: 'ejs'
}))

//bodyparser config
app.use(bodyParser({
    formLimit:"5mb",
    jsonLimit:"5mb",
    textLimit:"5mb"
}));

app.use(require('koa-static')('./public/upload'))

//routers
//login+logout+signup
app.use(require('./routers/login.js').routes())
//home
app.use(require('./routers/home.js').routes())
//profile
app.use(require('./routers/personal.js').routes())
//art
app.use(require('./routers/artdetail.js').routes())
//search
app.use(require('./routers/search.js').routes())
//editor
app.use(require('./routers/editor.js').routes())

//listening at 8080
app.listen(8080) 

console.log(`listening on port ${config.port}`)
