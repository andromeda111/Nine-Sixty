var express = require('express');
var router = express.Router();
var db = require('../db')

/* GET home page. */
router.post('/', function(req, res, next) {

  var hashed_pw = req.body.password
  var newUser = {
  username: req.body.username,
  hashed_pw: hashed_pw
}

  return db('users').insert(newUser, '*').then(user => {

    var test = user[0]

    res.json(test);
  })
});


module.exports = router;
