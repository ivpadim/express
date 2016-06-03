'use strict';

var express = require('express'),
     colors = require('colors'),
      posts = require('./mock/posts.json');

var postsList = Object.keys(posts).map(function(value){
      return posts[value];
});

var app = express();
var port = 3000;

//middleware: how to handle the request before routing
app.use('/static', express.static(__dirname + '/public'));

app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

app.get('/', function(req, res){
  var path = req.path;
  res.locals.path = path; //is the same as passing the data on the render method
  res.render('index');
});

app.get('/blog/:title?', function(req, res){
  var title = req.params.title;
  if(title === undefined){
    res.status(503);
    res.render('blog', {'posts': postsList});
  }
  else{
    var post = posts[title] || {};
    res.render('post',{'post': post});
  }
});

app.get('/posts', function(req, res){
  if(req.query.raw){
    res.json(posts);
  }
  else{
    res.json(postsList);
  }
});

app.listen(port, function(){
  console.log(('The frontend server is running on port ' + port).green);
  console.log();
});
