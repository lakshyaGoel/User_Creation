var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

/* GET users listing. */
router.get('/', function(req, res, next) {

  var User = require('../model/user');
  User.find({}, function(err, users){
    console.log(JSON.stringify(users));
  })
  res.send('respond with a resource');
});

router.get('/add', function(req, res, next){
  console.log("ADD");
});

module.exports = router;
