'use strict'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var cookieSession = require('cookie-session')
var methodOverride = require('method-override')
var app = express();
var hbs = require('hbs')

// Route Requires
var index = require('./routes/index');
// var session = require('./routes/session')
// var users = require('./routes/users');
var home = require('./routes/home');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials')

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.enable('trust proxy')
app.use(logger('dev'));
app.use(methodOverride('_method'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  name: 'nine-sixty',
  secret: process.env.SESSION_SECRET,
  secure: app.get('env') === 'production'
}))

// Look into later ? /////
app.use((req, res, next) => {
  if (req.session) res.locals.user = req.session
  next()
})

// ROUTES
app.use('/', index);
// app.use('/users', users)
app.use('/home', home)
// app.use('/session', session)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
