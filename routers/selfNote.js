const router = require('koa-router')();
const userModel = require('../lib/mysql');
const checkUser = require('../middlewares/checkUser');
const moment = require('moment');


//个人日记
module.exports = router;
