var express = require('express');
var router = express.Router();
var unirest = require('unirest');

/* GET home page. */
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
