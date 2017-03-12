var express = require('express');
var router = express.Router();
var Task = require('../models/tasks');

// Show all tasks
router.get('/', function(req, res, next) {
  Task.find(function (err, tasks) {
    if (err) {
      res.render('error', { pageHeader: 'Error', message: 'Cannot retrieve Tasks from database', error: err });
    }
    else {
      console.log("Tasks found in database: ")
      console.log(tasks);
      res.render('tasks', { pageHeader: 'Todo lists', tasks: tasks });
    }
  })
});

// Show Create Task Form
router.get('/new', function(req,res, next) {
  res.render('newtask', { pageHeader: 'New Task' })
});

// Handle Post request to /tasks
router.post('/', function(req,res, next) {
  console.log("request body:")
  console.log(req.body)
  var task = new Task({
    'name': req.body.name,
    'priority': req.body.priority,
    'description': req.body.description
  })

  console.log("create a new task:")
  console.log(task)

  task.save(function(err, savedTask) {
    if (err){
       res.render('error', { pageHeader: 'Error', message: 'Cannot save a new Task to database', error: err });
    }
    else {
        res.redirect('/tasks')
    }
  })
});

module.exports = router;
