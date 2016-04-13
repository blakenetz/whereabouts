var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')[process.env.DB_ENV]);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/signup', function (req, res, next){
  res.render('signup');
})

router.post('/signup', function(req, res, next){
  console.log(req.body);
  knex('users').insert({email: req.body.email,
                        username: req.body.username,
                        password: req.body.password,
                        avatar: req.body.avatar,
                        admin: req.body.admin,
                        auth_strategy: 'local'
  }).then(function(){
    res.redirect('/');
  })
})

router.get('/logout', function(req, res, next){
  console.log('before', req.session);
  req.session = null;
  console.log('after', req.session);
  res.redirect('/');
})



module.exports = router;
