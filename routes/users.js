var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')[process.env.DB_ENV]);


function checkNum (req, res, next) {
  if (+req.params.id > 0) {
    next();
  } else {
    res.redirect('/')
  }
}

router.get('/:id', checkNum, function(req, res, next){
  knex('users').where({user_id: req.params.id})
  .then( function (user) {
    if(user[0] === undefined){
      res.redirect('/');
    };
    res.render('userDetails', {user: user})
  })
})



module.exports = router;
