var express = require('express');
var router = express.Router();
var db = require('../db')

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

/* GET home page. */
router.get('/', authorize, function(req, res, next) {
  var userId = req.session.userId
  console.log(userId + ' arrived home');
  db('users').select('*').where('id', userId)
  .then(userData => {
    console.log(userData);
    if (!userData[0].initiated) {
      res.redirect('/init')
    } else {
      return res.render('home', userData);
    }
  })
});

router.get('/init', authorize, (req, res, next) => {
  console.log('made it to /init');
  res.render('init')
})

/* GET check for User Data on page load */
router.get('/check', authorize, function(req, res, next) {
  var userId = req.session.userId
  console.log(userId + ' getting data');
  db('users').select('initiated', 'zip', 'sign').where('id', userId)
  .then(userData => {
    console.log(userData);
    res.json(userData);
  })
});






module.exports = router;
