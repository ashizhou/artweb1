const router = require('koa-router')()
const userModel = require('../lib/mysql.js')
const multer = require('koa-multer');

router.post('/upload-img', async (ctx, next) => {
    let form=new formidable.IncomingForm();
    let dir="./public/image/";
    await ctx.render('editor', {
        session: ctx.session
    })
})

module.exports = router