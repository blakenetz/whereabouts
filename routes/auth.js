var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')[process.env.DB_ENV]);
var bcrypt = require('bcrypt');


router.post('/signup', function(req, res, next){
  if (req.body.username.length < 1 || req.body.username == /\s/g) {
    res.render('signup', {
      erra : "Please enter a valid username",
      body : req.body
    })
  } if (req.body.email.length < 1 ) {
    res.render('signup', {
      errb : "Please enter a valid email address",
      body : req.body
    })
  } if (req.body.password.length < 5) {
    res.render('signup', {
      errc : "Passwords must contain 6 or more characters",
      body : req.body
    })
  } if (req.body.avatar.length < 1) {
    res.render('signup', {
      errd : "Please add a URL to your avatar",
      body : req.body
    })
  } else {
    knex('users').where({
      email: req.body.email
    }).first().then(function(user){
      if(!user){
        var salt = Math.floor(Math.random() * 0xFFFF);
        var saltedPassword = req.body.password + salt;
        var hash = bcrypt.hashSync(saltedPassword, 10);

        knex('users').insert({
          email: req.body.email,
          username: req.body.username,
          password: hash,
          salt: salt,
          avatar: req.body.avatar,
          auth_strategy: 'local'
        }).then(function(){
          res.redirect('/');
        }).catch(function(err){
          res.render('signup', {
            erre : "Username already exists",
            body: req.body
          })
        })
      } else {
        res.render('login', { message : "This email already exists, please login below:" })
      }
    })
  }
})





module.exports = router;
