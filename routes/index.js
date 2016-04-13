var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')[process.env.DB_ENV]);
var unirest = require('unirest');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("this is the user", req.session);
    res.render('index', { dis : 10});
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/signup', function (req, res, next){
  res.render('signup');
})

router.get('/logout', function(req, res, next){
  console.log('before', req.session);
  req.session = null;
  console.log('after', req.session);
  res.redirect('/');
})

module.exports = router;
