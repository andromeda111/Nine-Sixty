var express = require('express');
var router = express.Router();
var db = require('../db')
const bcrypt = require('bcrypt-as-promised');

// NOT CURRENTLY USING _ DELETE LATER

// Authorize (Middleware)
const authorize = function(req, res, next) {
  console.log(req.session);
  if (!req.session.userId) {
    return next({
      status: 401,
      message: 'Unauthorized'
    });
  }

  next();
};

// Register user
router.post('/', (req, res, next) => {
  bcrypt.hash(req.body.password, 12)
  .then(hashed_pw => {
    var newUser = {
      username: req.body.username,
      hashed_pw: hashed_pw,
    }

    console.log(newUser)

    return db('users').insert(newUser, '*')
      .then(users => {
        console.log(users);
        var user = users[0]
        console.log(user);
        delete user.hashed_pw

        req.session.userId = user.id
        req.session.username = user.username

        res.redirect(`/home`)
      }).catch((err) => {
        next(err)
      })
  })
})

// Logout User
router.get('/logout', (req, res, next) => {
  req.session = null
  res.redirect('/')
})



module.exports = router;
