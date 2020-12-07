const router = require('koa-router')();
const userModel = require('../lib/mysql');
const checkUser = require('../middlewares/checkUser');
const moment = require('moment');
const { default: swal } = require('sweetalert');

//Middleware Checkup
router.get('/artdetail', async (ctx, next) => {
    if (!checkUser.checkUp(ctx)) {
        ctx.redirect('/home')
        swal('Ooops Access Denied', 'Please Log in or Sign', 'error');
    }
    await ctx.render('artdetail', {
        session: ctx.session
    })
})

//Art Detail Page
router.get('/artdetail/:postId', async(ctx, next) => {
    let postId = ctx.params.postId,
        count,
        res,
        pageOne,
        validator,
        likes; 
    console.log(postId,'id')
    await userModel.findArtById(postId) 
        .then(result => {
            res = result;
        })
    await userModel.updateArtPv(postId)
    await userModel.findCommentByPage(1, postId)
        .then(result => {
            pageOne = result
        })
    await userModel.findCommentCountById(postId)
        .then(result => {
            count = result[0].count
        })
    await userModel.findLikeByArtId(postId)
        .then(result =>{
            likes = result
            console.log(result)
        })
    if (ctx.session.user){
        await userModel.ValidateLikeByArtId([ctx.session.user,postId])
        .then(result =>{
            validator=result
            console.log(validator)
        }).catch((err) => {
            console.log(err)
        })
    }
    
    await ctx.render('artdetail', {
        session: ctx.session,
        art: res[0],
        likes: likes,
        commentLength:count,
        commentPageLength: Math.ceil(count / 10),
        pageOne: pageOne,
        validator: validator
    })

})


//Like
router.get('/addHeart/:artId', async (ctx, next) => {
    console.log(ctx.query.flag)
    let flag = ctx.query.flag,
        likes,
        artId = ctx.params.artId;
    await userModel.findArtById(ctx.params.artId)
        .then((result) => {
            likes = parseInt(result[0]['likes']);
        })
    if (flag == 1) {
        likes += 1;
        await userModel.insertLikes([ctx.session.user, artId])
            .then(() => {
                console.log('click like');
            }).catch((err) => {
                console.log(err);
            })

        await userModel.updateArtLike([likes, artId])
            .then(() => {
                ctx.body = true;
                console.log('Success Like')
            }).catch((err) => {
                console.log(err)
                ctx.body = false;
            })

    } else if (flag == 2) { //Dislike
        await userModel.poseLikes([ctx.session.user, artId])
            .then(() => {
                console.log('Click DisLike');
            }).catch((err) => {
                console.log(err);
            })

        likes += -1;
        await userModel.updateArtLike([likes, artId])
            .then(() => {
                ctx.body = true;
                console.log('DisLikes Success')
            }).catch((err) => {
                console.log(err)
                ctx.body = 'false';
            })
    }
})

//Comment
router.post('/comment/:artId', async (ctx, next) => {
    console.log(ctx.request.body.comments)
    let artId = ctx.params.artId,
        content = ctx.request.body.comments,
        name = ctx.session.user,
        avator = ctx.session.avator,
        comment;
    await userModel.insertComment([name, content, moment().format('YYYY-MM-DD HH:mm'), artId, avator])
        .then(result => {
            console.log("comment success");
        }).catch(err => {
            console.log(err);
        });
    await userModel.findCommentById(artId)
        .then(result => {
            // console.log(result[0]);
            console.log(result)
            comment = parseInt(result[0]['comments']) + 1;

        }).catch(err => {
            console.log(err);
        });
    await userModel.addArtComment(artId)
        .then(result => {
            console.log(result);
            ctx.body = 'art sql comment+1';
        }).catch(err => {
            console.log(err);
            ctx.body = 'art sql comment failed';
        });
})

//Comment Pagnation
router.post('/artdetail/:artId/commentPage', async (ctx, next) => {
    let artId = parseInt(ctx.params.artId),
        page = parseInt(ctx.request.body.page);
    console.log(artId, page)
    await userModel.findCommentByPage(page, artId)
        .then(result => {
            ctx.body = result;
            console.log(result);
        }).catch(err => {
            ctx.body = 'error';
            console.log(err);
        })
})

//Delete Comment
//=>windows reload=>Detail Page -Commemt =>Home Page Comment-1
router.get('/deleteComment/:artId/:commentId', async (ctx, next) => {
    let commentId = ctx.params.commentId;
    let artId = ctx.params.artId,
        comment;
    await userModel.deleteComment(commentId)
        .then(result => {
            console.log('artcomment sql delete comment success');
        }).catch(err => {
            console.log(err);
            ctx.body = 'false';
        })
    await userModel.poseArtComment(artId)
        .then(result => {
            console.log('art sql delete comment success');
            ctx.body = 'delete comment';
        }).catch(err => {
            console.log(err);
            ctx.body = 'delete comment error';
        })
})
module.exports = router