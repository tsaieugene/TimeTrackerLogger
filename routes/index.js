var express = require('express');
var router = express.Router();

/* Redirect to login page. */
router.get('/', function(req, res) {
    res.redirect('/login');
});

module.exports = router;
