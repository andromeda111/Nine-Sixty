var express = require('express');
var router = express.Router();
var db = require('../db')
const bcrypt = require('bcrypt-as-promised');

/* GET home page. */
// router.post('/', function(req, res, next) {
//   bcrypt.hash(req.body.password, 12).then((hashed_pw) => {
//
//     var newUser = {
//       username: req.body.username,
//       hashed_pw: hashed_pw
//     }
//     console.log(newUser);
//     return db('users').insert(newUser, '*')
//     .then(user => {
//       res.redirect('/home');
//     })
//   })
//
// });


module.exports = router;
