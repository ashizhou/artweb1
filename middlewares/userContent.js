


//Pin 
module.exports = {
    updateArticle:(result)=>{
        let str = '';
        result.forEach(function(post){
            str += '<article class="article-list">' +
  '<div class="content">' +
       '<a href="/personal/' + post.name + '" title="' + post.name + '" class="post-author">' +
           '<span class="author">' + post.name + '&nbsp;&nbsp;</span>' +
           '<span class="times">' + post.moment + '</span>' +
      ' </a>' +
       '<a href="/artdetail/' + post.id + '">' +           
           '<h4 class="title">' +  post.title + '</h4>' +
       '</a>' +
      ' <div class="content-fo"><span class="glyphicon glyphicon-heart"></span><span>' + post.likes + 
      '</span><span class="glyphicon glyphicon-comment"></span><span>' + post.comments +
      '</span>&nbsp;&nbsp;&nbsp;<span class="pv-item">View&nbsp;<span class="pv">' + post.pv + '</span></span>' +
       '</div></div>  </article>'
        })
        return str;
    }
}