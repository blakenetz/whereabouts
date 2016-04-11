var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);


/* GET home page. */
router.get('/', function(req, res, next) {
  knex('posts')
  .then( function (posts) {
    res.render('index', { posts: posts });
  })
});

module.exports = router;
