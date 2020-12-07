const router = require('koa-router')()
const userModel = require('../lib/mysql.js')

router.get('/', async (ctx, next) => {
    ctx.redirect('/home')
})
router.get('/home', async (ctx, next) => {
    let types;
    if (!ctx.request.querystring) {
        types = 'all';
        await userModel.findArtByPage(1)
            .then(result => {
                //console.log(result)
                post = result
            })
        await userModel.findAllArt()
            .then(result => {
                postsLength = result.length
            })
        if (ctx.session.user) {
            await userModel.findDataByName(ctx.session.user)
                .then(res => {
                    ctx.session.avator = res[0]['avator']
                })
        }

    } else {
        types = ctx.request.querystring.split('=')[1];
        console.log(types)
        let _sql = `select * from art where Title Like '%${types}%' Limit 0,10`;
        await userModel.query(_sql)
            .then(result => {
                post = result;
            })
        _sql = `select * from art where Title Like '%${types}%'`;
        await userModel.query(_sql)
            .then(result => {
                postsLength = result.length;
            })
    }

    await ctx.render('home', {
        session: ctx.session,
        art: post,
        type: types,
        postsLength: postsLength,
        postsPageLength: Math.ceil(postsLength / 10),

    })
})

// home pagination 10 posts/page
router.post('/home/page', async (ctx, next) => {
    let page = ctx.request.body.page,
        type = ctx.request.querystring.split('=')[1];
    console.log(type)
    if (type == 'all') {
        await userModel.findArtByPage(page)
            .then(result => {
                console.log(result)
                ctx.body = result
            }).catch(err => {
                console.log(err)
                ctx.body = 'false'
            })

    } else {
        let _sql = `select * from art where Title Like '%${type}%' Limit ${(page-1)*10},10`;
        await userModel.query(_sql)
            .then(result => {
                ctx.body = result
            }).catch(err => {
                console.log(err)
                ctx.body = 'false'
            })
    }

})

router.get('/about', async (ctx, next) => {
    await ctx.render('about', {
        session: ctx.session
    })
})

module.exports = router