var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')[process.env.DB_ENV]);
var unirest = require('unirest');

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index', {user: req.session.passport.user});
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/signup', function (req, res, next){
  res.render('signup');
})

router.get('/logout', function(req, res, next){

  req.session = null;


  res.redirect('/');
})

module.exports = router;
