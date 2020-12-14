const router = require('koa-router')();
const userModel = require('../lib/mysql');
const checkUser = require('../middlewares/checkUser');
const moment = require('moment');


router.get('/search', async (ctx, next) => {
    let artist = ctx.request.querystring.split('=')[1];
        artist=decodeURIComponent(artist)
        console.log("selected artist:",artist)
        let _sql = `select * from art where Author = '${artist}'`;
        await userModel.query(_sql)
            .then(result => {
                post = result;
                postsLength = result.length;
                console.log("artist length:",postsLength)
            })
    await ctx.render('search', {
        session: ctx.session,
        art: post,
        postsLength: postsLength,
    })
})


module.exports = router;
