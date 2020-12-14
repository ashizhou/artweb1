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
    PRIMARY KEY (id)
   );`

var artlikes = `create table if not exists artlikes(
    id INT(200) NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL COMMENT 'user name',
    artid INT(200) NOT NULL COMMENT 'art id',
    PRIMARY KEY (id)
);`

var bookmark = `create table if not exists bookmark(
    id INT(200) NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL COMMENT 'user name',
    artid INT(200) NOT NULL COMMENT 'art id',
    PRIMARY KEY (id)
);`


let createTable = function(sql){
    return query(sql, []);
}

//Creat Sql Table
createTable(users);
// createTable(posts);
createTable(artcomment);
createTable(artlikes);
createTable(bookmark);


//User Register
let insertData = function(value){
    let _sql = `INSERT into users(name,pass) values(?,?);`
    return query(_sql,value);
}
//Delete User (test)
let deleteUserData=function(name){
    let _sql = `DELETE from users where name="${name}";`
    return query(_sql);
}
//Find use by user name
let findDataByName = function(name){
    let _sql = `SELECT * from users where name="${name}"`
    return query(_sql);
}

//Update user information
let updateUser = function(value){
    let _sql = `UPDATE users set name=?,job=?,company=?,introdu=?,userhome=?,github=? where id=?`
    return query(_sql,value);
}

//Find Like from art: id
let findLikeByArtId = function(id){
    let _sql = `SELECT id, likes from art where id="${id}"`
    return query(_sql);
} 
 // Find Like form artlikes: username
 let findLikeByName = function(name){
    let _sql = `SELECT * from artlikes where name="${name}"`
    return query(_sql);
}

//Validate Like
let ValidateLikeByArtId = function(value){
    let _sql = `SELECT * FROM artlikes WHERE name=? and artid=?`
    return query(_sql,value);
} 
//Add like
let insertLikes = function(value){
    let _sql = `INSERT into artlikes(name,artid) values(?,?);`
    return query(_sql,value);
}
//Pose Like
let poseLikes = function(value){
    let _sql = `DELETE from artlikes WHERE name =? and artid=? `
    return query(_sql,value);
}
//Find BookMark: art id
let findMarkByArtId = function(id){
    let _sql = `SELECT id, bookmark from art where id="${id}"`
    return query(_sql);
} 
//Validate BookMark
let ValidateMarkByArtId = function(value){
    let _sql = `SELECT * FROM bookmark WHERE name=? and artid=?`
    return query(_sql,value);
} 
//Add BookMark
let insertBookMark = function(value){
    let _sql = `INSERT into bookmark(name,artid) values(?,?);`
    return query(_sql,value);
}
//Pose BookMark
let poseBookMark = function(value){
    let _sql = `DELETE from bookmark WHERE name =? and artid=? `
    return query(_sql,value);
}

//Find Comment
let findCommentById = function(id){
    let _sql =  `SELECT * from artcomment where artid="${id}"`
    return query(_sql);
}

// Comment Pagination
let findCommentCountById = function(id){
    let _sql =  `SELECT count(*) as count from artcomment where artid="${id}"`
    return query(_sql);
}

//Find all arts
let findAllArt=function(){
    let _sql = `SELECT * FROM art`
    return query(_sql);
}
//Art by ID
let findArtById = function(id){
    let _sql = `SELECT * from art where id="${id}"`
    return query(_sql);
}
//Find arts by page
let findArtByPage=function(page){
    let _sql = `SELECT * FROM art Limit ${(page-1)*10},10`
    return query( _sql)
  }

//Update Art Comment +1
let addArtComment = function(id){
    let _sql = `update art set comments=comments+1 where id="${id}"`
    return query(_sql);
}
//Update Art Comment -1
let poseArtComment = function(id){
    let _sql = `update art set comments=comments-1 where id="${id}"`
    return query(_sql);
}
//Update art views
let updateArtPv = function(id){
    let _sql = `update art set pv= pv + 1 where id="${id}"`
    return query(_sql);
}
//Update art Like+1
let updateArtLike = function(value){
    let _sql = `update art set likes=? where id=?`
    return query(_sql,value);
}
 // Find User Info: BookMark
let findMarkByName = function(name){
    let _sql = `SELECT * from bookmark where name="${name}"`
    return query(_sql);
}
//Insert comment to artcomment
let insertComment = function(value){
    let _sql =`INSERT into artcomment(name,content,moment,artid,avator) values(?,?,?,?,?);`
    return query(_sql,value);
}
//Delete comment from artcomment
let deleteComment = function(id){
    let _sql = `DELETE from artcomment where id = "${id}"`
    return query(_sql);
}
//Comment Length
let findCommentLength = function(id){
    let _sql = `SELECT artid, content from artcomment where artid = "${id}"`
    return query(_sql);
}
// Comment pagination
let findCommentByPage = function(page,artid)  {
    let _sql = `SELECT * from artcomment where artid=${artid} order by id desc limit ${(page-1)*10},10`
    return query(_sql);
  }



//暴露所有函数接口
module.exports = {
    query,
    createTable,
    insertData,
    deleteUserData,
    updateUser,
    findDataByName,

    //Comment
    insertComment,
    findCommentById,
    findCommentCountById,
    deleteComment,
    findCommentLength,
    findCommentByPage,


   //Art
   findAllArt,
   findArtById,
   findArtByPage,
   addArtComment,
   poseArtComment,
   updateArtPv,
   updateArtLike,
   findLikeByArtId,
   findMarkByArtId,

    //Like
    insertLikes,
    poseLikes,
    findLikeByName,
    ValidateLikeByArtId,

    //BookMark
    insertBookMark,
    poseBookMark,
    findMarkByName,
    ValidateMarkByArtId,

}
