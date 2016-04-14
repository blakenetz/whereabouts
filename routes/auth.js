var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')[process.env.DB_ENV]);
var bcrypt = require('bcrypt');


router.post('/signup', function(req, res, next){
  if (req.body.username.length < 1 || req.body.username == /\s/g) {
    res.render('signUp', {
      erra : "Please enter a valid username",
      body : req.body
    })
  } else if ( /^[^@]+@[^@]+\.[^@]+$/.test(req.body.email) === false ) {
    res.render('signUp', {
      errb : "Please enter a valid email address",
      body : req.body
    })
  } else if (req.body.password.length < 4) {
    res.render('signUp', {
      errc : "Passwords must contain 4 or more characters",
      body : req.body
    })
  } else if (req.body.avatar.length < 1) {
    res.render('signUp', {
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
          res.render('login', {username: req.body.username});
        }).catch(function(err){
          res.render('signUp', {
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
