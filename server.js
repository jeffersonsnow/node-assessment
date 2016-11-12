var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var users = require('./users.json');
app.use(bodyParser.json());

app.get('/api/users', function(req, res, next){
  console.log('getting users . . .');
  res.json(users);
});
app.get('/api/users', function(req, res, next){
  var langUsers = [];
  if(req.query){
    console.log("stepping in");
  for (var i = 0; i < users.length; i++){
    if(req.query.language === users[i].language){
      langUsers.push(users[i]);
    }
  }
  res.json(langUsers);
}
});

app.get('/api/users/:privilege', function(req, res, next){
  var userType = req.params.privilege;
  var newArr = [];
  for(var i = 0; i < users.length; i++){
    // console.log(users[i].type);
    if(userType === users[i].type){
      newArr.push(users[i]);
    }
  }
  res.json(newArr);
});

app.get('/api/users/:id', function(req, res, next){
  var userId = req.params.id;
  var correctUser;
  for(var i = 0; i < users.length; i++){
    console.log(users[i].id);
    if(userId === users[i].id){
      correctUser = users[i];
    }
  }
    if(correctUser){
      res.json(correctUser);
  } else {
    res.json("404");
  }
});

app.post('api/users', function(req, res, next){
  req.body.id = users.length;
  next();
});
app.post('api/users', function(req, res, next){
  users.push(req.body);
  res.json("User " + req.body.id + " has been created.");
});

app.post('api/users/', function(req, res, next){
  if(req.params.type){
    (req.params.type = req.body.type);
  }
});

app.listen(3000, function(){
  console.log("Listening on port 3000");

});

module.exports = app;
