var router = require('koa-router')();
var checkUser = require('../middlewares/checkUser');
router.get('/signout', async(ctx, next) => {
    ctx.session = null;
    console.log('signed out');
    ctx.body = true;
    ctx.redirect('/home');

})

module.exports = router