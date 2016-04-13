var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')[process.env.DB_ENV]);
var bcrypt = require('bcrypt');


router.post('/signup', function(req, res, next){
  if (req.body.username.length < 1 || req.body.username !== /\s/g) {
    res.render('signup', {
      erra : "Please enter a valid username",
      body : req.body
    })
  } if (req.body.email.length < 1 || req.body.email !== /[@.]/g) {
    res.render('signup', {
      errb : "Please enter a valid email address",
      body : req.body
    })
  } if (req.body.password.length < 1) {
    res.render('signup', {
      errc : "Please add a password",
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
          console.log(err);
          res.redirect('/login')
        })
      } else {
        res.redirect('/login')
      }
    })
  }
})





module.exports = router;
