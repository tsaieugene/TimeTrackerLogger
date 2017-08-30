var express = require('express');
var router = express.Router();

//active connection to database
var knex = require('../db/knex');
var adminId = 100784047254119;

// get all tasks posted (admin only)
router.get('/admin', function(req, res) {
    var id = req.query.id;
    var numId =  Math.floor(Number(id));
    if (numId == adminId) {
        knex('todo')
        .select()
        .orderBy('id', 'desc')
        .then(function(todos) {
            res.render('viewAll', { todos: todos, id: id});
        });
    }
});

// get history of tasks for current user
router.get('/user', function(req, res) {
    var id = req.query.id;
    var numId =  Math.floor(Number(id));
    console.log('history for: ' +id);
    var d = new Date();
    d = d.toISOString().substring(0, 10);
    if (String(numId) === id && numId >= 0) {
        knex('todo')
        .whereNot('date', d)
        .andWhere('createdBy', id)
        .select()
        .orderBy('id', 'asc')
        .then(function(todos) {
            res.render('history', { todos: todos, id: id});
        });
    } else {
        res.render('error', {status: 500, message: 'Server error, invalid url'}); 
    }
});

module.exports = router;
