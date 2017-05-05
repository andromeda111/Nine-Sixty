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
  console.log('/arrived home');
  res.render('home');
});






module.exports = router;
