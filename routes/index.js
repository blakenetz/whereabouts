var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);


/* GET home page. */
router.get('/', function(req, res, next) {
  knex('posts').innerJoin('users', 'posts.user_id', 'users.id')
  .then( function (posts) {
    res.render('index', { posts: posts });
  })
});

module.exports = router;
