var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')[process.env.DB_ENV]);

router.get('/', function (req, res, next){
  console.log('yo face');
  knex('users')
  .then(function(users){
    console.log('hello');
      res.render('usersAll', {users: users});
  })
});

router.delete('/:id', function(req, res, next) {
  knex('users').where({'user_id': req.params.id}).del()
  .then(function() {
    res.status(200).json({user: 'deleted'});
  })
});

router.patch('/:id/:checked', function(req, res , next) {
  knex('users').where({'user_id': req.params.id}).update({'admin': req.params.checked})
  .then(function(){
    res.status(200).json({user: 'edited'});
  })
});

module.exports = router;
