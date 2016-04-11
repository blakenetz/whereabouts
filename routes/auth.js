var express = require('express');
var router = express.Router();
var unirest = require('unirest');

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/logout', function(req, res){
  req.session.passport.user = null;
  // req.logout();
  res.redirect('/');
});

module.exports = router;
