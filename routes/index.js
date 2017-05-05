var express = require('express');
var router = express.Router();
var db = require('../db')

/* GET home page. */
router.get('/', (req, res, next) => {
  if (!req.session.userId) {
    return res.render('index');
  } else {
    return res.redirect('home');
  }
});

// router.get('/:id', function(req, res, next) {
//   var userId = req.params.id
//
//   db('tasks').select('*').where({user_id: userId}).then(userTasks => {
//     console.log(userTasks);
//     res.json(userTasks);
//   })
// });

router.post('/', (req, res, next) => {
  var taskData = req.body.task
  console.log(taskData);
  res.redirect('http://www.google.com');
});

module.exports = router;
