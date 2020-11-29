var router = require('koa-router')();
var userModel = require('../lib/mysql.js');
var md5 = require('md5')

    // login modal
    /*
router.get('/signup', async(ctx, next) => {
        //await checkNotLogin(ctx)
        await ctx.render('login', {
            session: ctx.session,
        })
    })
    */
    // post login
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
// await (()=>{
//     Exist?
// }).then(()={
//     if not:query insert
//     then search id
// })

module.exports = router