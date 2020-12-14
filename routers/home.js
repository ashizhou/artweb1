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
                console.log("all page1")
                post = result
            })
        await userModel.findAllArt()
            .then(result => {
                postsLength = result.length
                console.log("all length:",postsLength)
            })
        if (ctx.session.user) {
            await userModel.findDataByName(ctx.session.user)
                .then(res => 
                    {
                    console.log("user date")  
                    ctx.session.avator = res[0]['avator']
                })
        }

    } else {
        types = ctx.request.querystring.split('=')[1];
        console.log("selected type:"+types)
        let _sql = `select * from art where Title Like '%${types}%' Limit 0,10`;
        await userModel.query(_sql)
            .then(result => {
                console.log("type page1")
                post = result;
            })
        _sql = `select * from art where Title Like '%${types}%'`;
        await userModel.query(_sql)
            .then(result => {
                postsLength = result.length;
                console.log("type length:"+postsLength)
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
                console.log("pagination success")
                ctx.body = result
            }).catch(err => {
                console.log(err)
                ctx.body = 'false'
            })

    } else {
        let _sql = `select * from art where Title Like '%${type}%' Limit ${(page-1)*10},10`;
        await userModel.query(_sql)
            .then(result => {
                console.log("pagination success")
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

router.get('/editor', async (ctx, next) => {
    await ctx.render('editor', {
        session: ctx.session
    })
})

router.get('/autocomplete',async(ctx,next)=>{
    let key = ctx.request.querystring.split('=')[1],
        rows,
        data=[];
    let _sql=`SELECT Author from art where Author like '%${key}%'`;
    await userModel.query(_sql)
    .then(result => {
        rows = result
        for(i=0;i<rows.length;i++)
      {
        data.push(rows[i].Author);
      }
      ctx.body=JSON.stringify(data);
	});
});

     
        
module.exports = router