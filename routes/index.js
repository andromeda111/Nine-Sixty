var express = require('express');
var router = express.Router();
var db = require('../db')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Nine Sixty' });
});

router.get('/:id', function(req, res, next) {
  var userId = req.params.id

  db('tasks').select('*').where({user_id: userId}).then(userTasks => {
    console.log(userTasks);
    res.json(userTasks);
  })
});

module.exports = router;
