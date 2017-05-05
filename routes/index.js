var express = require('express');
var router = express.Router();
var db = require('../db')
const bcrypt = require('bcrypt-as-promised')

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
router.get('/', (req, res, next) => {
  if (!req.session.userId) {
    return res.render('index');
  } else {
    return res.redirect('home');
  }
});

// User Settings
router.get('/settings', authorize, (req, res, next) => {
  var userData = {
    username: req.session.username
  }
  console.log(userData);
  res.render('settings', {userData})
})

// Delete User
router.delete('/settings/delete-user', authorize, (req, res, next) => {
  var userId = req.session.userId
  db('users')
    .where('id', userId)
    .del()
    .returning('id')
    .then(userId => {
      db('tasks')
        .where('user_id', userId[0])
        .del()
        .then(() => {
          req.session = null
          res.redirect('/')
        })
    })
})

// Login User
router.post('/login', (req, res, next) => {
  var { username, password } = req.body

  if (!username || !username.trim()) {
    return next({
      status: 400,
      message: 'Username must not be blank'
    });
  }

  if (!password) {
    return next({
      status: 400,
      message: 'Password must not be blank'
    });
  }

  var user;

  db('users').where('username', username).first()
  .then(result => {
    if (!result) {
      throw {
        status: 400,
        message: 'Bad username or password'
      };
    }
    user = result
    return bcrypt.compare(password, user.hashed_pw)
  })
  .then(() => {
    delete user.hashed_pw
    req.session.userId = user.id
    req.session.username = user.username
    res.redirect(`/`)
  })
  .catch(bcrypt.MISMATCH_ERROR, () => {
    throw { status: 400, message: 'Oops! Your username or password didn\'t work. Go back and try again!' }
  })
  .catch((err) => {
    next(err)
  })
})

// Logout User
router.get('/logout', authorize, (req, res, next) => {
  req.session = null
  res.redirect('/')
})

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

// router.get('/:id', function(req, res, next) {
//   var userId = req.params.id
//
//   db('tasks').select('*').where({user_id: userId}).then(userTasks => {
//     console.log(userTasks);
//     res.json(userTasks);
//   })
// });

// router.post('/', (req, res, next) => {
//   var taskData = req.body.task
//   console.log(taskData);
//   res.redirect('http://www.google.com');
// });

module.exports = router;
