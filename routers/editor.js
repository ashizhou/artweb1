const router = require('koa-router')()
const userModel = require('../lib/mysql.js')
const multer = require('koa-multer');
const storage=multer.diskStorage({
  destionation:function(req,file,callback){
      callback(null,'./public/upload')
  },
  filename: function(req,file,callback){
      const fileformate=(file.originalname).split('.');
      callback(null,Date.now()+'.'+fileformate[fileformate.length-1]);
  }
})



const upload = multer({ storage:storage });

//ATTENTION! change filename while production in server
router.post('/upload-img',upload.single('mypic'), async (ctx, next) => {
    var token = ctx.headers.authorization;
    if(token){
        var result = await tools.verToken(token);
        ctx.body = {
          isok:true,
          filename: "http://localhost:8080"+ctx.req.file.filename
        }
      
     }else{
          ctx.body = {
              isok:false,
              msg:'failed loading'
          }
      }
  
  })

module.exports = router