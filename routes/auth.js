var express = require('express');
var router = express.Router();
var unirest = require('unirest');

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});


module.exports = router;