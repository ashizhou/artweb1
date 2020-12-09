var router = require('koa-router')();
var userModel = require('../lib/mysql.js')
var md5 = require('md5')

/*
router.get('/signin', async(ctx, next) => {
   // await checkNotLogin(ctx)
    await ctx.render('signin', {
        session: ctx.session,
    })
})
*/
router.post('/signin', async(ctx, next) => {
    console.log(ctx.request.body)
    var name = ctx.request.body.username;
    var pass = ctx.request.body.pass;

    await userModel.findDataByName(name)
        .then(result => {

            var res = JSON.parse(JSON.stringify(result))

            if (name === res[0]['name']&&(md5(pass + 'asd&$BH&*') === res[0]['pass'])) {
                    console.log('Signed In')
                    ctx.body = {
                        code: 1,
                    }
    
                    ctx.session.user = res[0]['name']
                    ctx.session.id = res[0]['id']
                    ctx.session.avator = res[0]['avator']


            }else if(md5(pass + 'asd&$BH&*') != res[0]['pass']){
                ctx.body = {
                    code: 2 //密码错误
                }
            }
        }).catch(err => {
            ctx.body = {
                code: 3 //账号不存在+
            }
            console.log('Wrong Creditential Info')

        })

})

router.post('/signup', async(ctx, next) => {
    console.log(ctx.request.body)
    var user = {
        name: ctx.request.body.username,
        pass: ctx.request.body.pass,
        repeatpass: ctx.request.body.repeatpass
    }
    let flag = 0;
    await userModel.findDataByName(user.name)
        .then(result => {
            console.log(result)
            if (result.length) {
               
                    //handle err
                    console.log('user already exits')
                    ctx.body = {
                        code: 1
                    };               
                
            } else if (user.pass !== user.repeatpass || user.pass == '') {
                ctx.body = {        //push context to front
                    code: 2
                };

            } else {
                flag = 1;             
                
            }
        })
    if(flag==1){
        let res = await  userModel.insertData([user.name, md5(user.pass + 'asd&$BH&*') ])
       console.log(res.insertId)
        await  userModel.findDataByName(user.name)
        .then((result)=>{
            
          //  var res = JSON.parse(JSON.stringify(result))
            console.log(result[0]['avator'])
            ctx.session.id = res.insertId;
            ctx.session.user=user.name;
            ctx.session.avator = 'defaulticon.png';
            ctx.body = {
            code: 3
            };
            console.log('sign up success')
         })
    }

})

router.get('/signout', async(ctx, next) => {
    ctx.session = null;
    console.log('Log out');
    ctx.body = 'true';
    ctx.redirect('/home');

})

module.exports = router