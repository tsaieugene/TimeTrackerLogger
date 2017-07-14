var express = require('express');
var router = express.Router();

//active connection to database
var knex = require('../db/knex');

// This router is mounted at http://localhost:3000/todolist 

// GET current day's todolist for logged in user 
router.get('/user', function(req, res) {
    //get todos from database
    var id = req.query.id;
    var numId = Math.floor(Number(id));
    var d = new Date();
    d = d.toISOString().substring(0, 10);
    if (String(numId) === id && numId >= 0) {
        knex('todo')
        .where('date', d)
        .andWhere('createdBy', id)
        .select()
        .orderBy('id', 'asc')
        .then(function(todos) {
            res.render('todolist', { todos: todos, date: d, id: id});
        });
    } else {
          res.render('error', {status: 500, message: 'Server error, invalid url'}); 
    }
});

// add new task
router.post('/:id', function(req, res) {
    var id = req.params.id;
    var numId = Math.floor(Number(id));
    var input = req.body;
    var d = new Date();
    console.log('id: ' + id);
    d = d.toISOString().substring(0, 10);
    if(typeof input.title == 'string' && input.title.trim() != '' && String(numId) === id && numId >= 0) {
        var todo = {
            title: input.title,
            date: d,
            createdBy: id
        };
        knex('todo')
        .insert(todo, '*')
        .then(function(todos) {
            todo = todos[0];
            res.json({title: todo.title, statusCode: 200, statusText: 'Success'});
        });
    } else {
        res.render('error', {status: 500, message: 'Server error'}); 
    }
});

// update completion status of a task
router.post('/:id/status', function(req, res) {
    var id = req.params.id;
    var numId =  Math.floor(Number(id));
    var checked = req.body.checked;
    if(String(numId) === id && numId >= 0 && checked != null) {
        knex('todo')
        .where('id', numId)
        .update('complete', checked)
        .then(function() {
            res.json({statusCode: 200, statusText: 'Success'});
        });
    } else {
        res.render('error', {status: 500, message: 'Server error'}); 
    }
});

// update title and/or time of a task
router.post('/:id/update', function(req, res) {
    var id = req.params.id;
    var numId =  Math.floor(Number(id));
    console.log(numId);
    console.log(req.body.title);
    console.log(req.body.time);
    var title = req.body.title;
    var time = req.body.time;
    if(String(numId) === id && numId >= 0 && time != null && time >= 0 && title != null) {
        knex('todo')
        .where('id', numId)
        .update({
            title: title,
            time: time
        })
        .then(function() {
            res.json({statusCode: 200, statusText: 'Success'});
        });
    } else {
        res.render('error', {status: 500, message: 'Server error, invalid url'}); 
    }
});

router.delete('/:id', function(req, res) {
    var id = req.params.id;
    var numId = Math.floor(Number(id));
    if(String(numId) === id && numId >= 0) {
        knex('todo')
        .where('id', numId)
        .del()
        .then(function() {
            res.json({statusCode: 200, statusText: 'Success'});
        });
    } else {
        res.render('error', {status: 500, message: 'Server error'}); 
    }
});

module.exports = router;
