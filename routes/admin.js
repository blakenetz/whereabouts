var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')[process.env.DB_ENV]);

router.get('/', function (req, res, next){
  knex('users')
  .then(function(users){
      res.render('usersAll', {users: users});
  })
});

router.delete('/:id', function(req, res, next) {
  console.log('got here');
  knex('users').where({'id': req.params.id}).del()
  .then(function() {
    res.status(200).json({user: 'deleted'});
  });
});

router.patch('/:id/:checked', function(req, res , next) {
  
})
// router.post('/edit', function(req, res, next){
//   knex('users').where({'id': req.params.id})
//   .then(function(user){
//     if (req.body. === undefined) {
//       req.body.admin = false
//     }
//   })
// })

module.exports = router;
