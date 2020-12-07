//import { create } from 'domain';
var mysql = require('mysql');
var config = require('../config/default.js')
var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});

let query =(sql, values)=> {
    return new Promise((resolve, reject)=>{
        pool.getConnection( (err,connection)=> {
            if(err){
                reject(err);
            }else{
                connection.query(sql,values,(err,rows)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(rows);
                    }
                    connection.release(); 
                })
            }
         
    })
    })
}
 
var users = `create table if not exists users(
    id INT(200) NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    pass VARCHAR(40) NOT NULL,
    avator VARCHAR(100) DEFAULT 'defaulticon.png', 
    job VARCHAR(40),
    company VARCHAR(40),
    introdu VARCHAR(255),
    userhome VARCHAR(100),
    github VARCHAR(100),
    PRIMARY KEY (id)
);`


var artcomment= `create table if not exists artcomment(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL COMMENT 'user name',
    content TEXT(0) NOT NULL COMMENT 'comment content',
    moment VARCHAR(40) NOT NULL COMMENT 'comment time',
    artid INT(200) NOT NULL COMMENT 'art id',
    avator VARCHAR(100) NOT NULL COMMENT 'user image',
    PRIMARY KEY ( id ),
    FOREIGN KEY (artid) REFERENCES art(id)
    ON DELETE CASCADE
   );`

var artlikes = `create table if not exists artlikes(
    id INT(200) NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL COMMENT 'user name',
    artid INT(200) NOT NULL COMMENT 'art id',
    PRIMARY KEY (id),
    FOREIGN KEY (artid) REFERENCES art(id)
    ON DELETE CASCADE
);`



let createTable = function(sql){
    return query(sql, []);
}

//建表
createTable(users);
// createTable(posts);
createTable(artcomment);
createTable(artlikes);


//user register
let insertData = function(value){
    let _sql = `INSERT into users(name,pass) values(?,?);`
    return query(_sql,value);
}
// //edit user image
// let updateUserImg = function(value){
//     let _sql = "update users set avator=? where id=?"
//     return query(_sql,value);
// }
//update user information
let updateUser = function(value){
    let _sql = `UPDATE users set name=?,job=?,company=?,introdu=?,userhome=?,github=? where id=?`
    return query(_sql,value);
}

//insert comment
let insertComment = function(value){
    let _sql =`INSERT into artcomment(name,content,moment,artid,avator) values(?,?,?,?,?);`
    return query(_sql,value);
}
 

//using art id find like
let findLikeByArtId = function(value){
    let _sql = `SELECT * from artlikes where artid=?`
    return query(_sql,value);
} 

let ValidateLikeByArtId = function(value){
    let _sql = `SELECT CASE WHEN EXISTS (SELECT * FROM artlikes WHERE name=? and artid=?) THEN 1 ELSE 0 END`
    return query(_sql,value);
} 
//增加点赞
let insertLikes = function(value){
    let _sql = `INSERT into artlikes(name,artid) values(?,?);`
    return query(_sql,value);
}

//取消赞
let poseLikes = function(value){
    let _sql = `DELETE from artlikes where name = ? and artid=? `
    return query(_sql,value);
}

//通过名字查找用户
let findDataByName = function(name){
    let _sql = `SELECT * from users where name="${name}"`
    return query(_sql);
}


//通过art id查找
let findCommentById = function(id){
    let _sql =  `SELECT * from artcomment where artid="${id}"`
    return query(_sql);
}

// 通过art id查找评论数
let findCommentCountById = function(id){
    let _sql =  `SELECT count(*) as count from artcomment where artid="${id}"`
    return query(_sql);
}
//ARTS
//find all arts
let findAllArt=function(){
    let _sql = `SELECT * FROM art`
    return query(_sql);
}
//Art by ID
let findArtById = function(id){
    let _sql = `SELECT * from art where id="${id}"`
    return query(_sql);
}
//find arts by page
let findArtByPage=function(page){
    let _sql = `SELECT * FROM art Limit ${(page-1)*10},10`
    return query( _sql)
  }
let updateArtComment = function(value){
    let _sql = `update art set comments=? where id=?`
    return query(_sql,value);
}

//Update art views
let updateArtPv = function(value){
    let _sql = `update art set pv= pv + 1 where id=?`
    return query(_sql,value);
}

//Update art Like
let updateArtLike = function(value){
    let _sql = `update art set likes=? where id=?`
    return query(_sql,value);
}
 //通过用户名查询点赞记录
let findLikeByName = function(name){
    let _sql = `SELECT * from likes where name="${name}"`
    return query(_sql);
}


//delete comment
let deleteComment = function(id){
    let _sql = `DELETE from artcomment where id = "${id}"`
    return query(_sql);
}

//删除所有评论
let deleteAllPostComment = function(id){
    let _sql = `DELETE from artcomment where artid = ${id}`
    return query(_sql);
}

//查找
let findCommentLength = function(id){
    let _sql = `SELECT content from artcomment where artid in (SELECT id from art where id=${id})`
    return query(_sql);
}
// comment pagination
let findCommentByPage = function(page,artid)  {
    let _sql = `SELECT * from artcomment where artid=${artid} order by id desc limit ${(page-1)*10},10;`
    return query(_sql);
  }



//暴露所有函数接口
module.exports = {
    query,
    createTable,
    insertData,
    updateUser,

    //Comment
    insertComment,
    findCommentById,
    findCommentCountById,
    deleteComment,
    findCommentLength,
    deleteAllPostComment,
    findCommentByPage,

   //文章
   findDataByName,

   //Art
   findAllArt,
   findArtById,
   findArtByPage,
   updateArtComment,
   updateArtPv,
   updateArtLike,
   findLikeByArtId,



    //点赞
    insertLikes,
    poseLikes,
    findLikeByName,
    ValidateLikeByArtId,

}
