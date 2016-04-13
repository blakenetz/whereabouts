var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')[process.env.DB_ENV]);
var bcrypt = require('bcrypt');


router.post('/signup', function(req, res, next){
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
       admin: req.body.admin,
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
})





module.exports = router;
