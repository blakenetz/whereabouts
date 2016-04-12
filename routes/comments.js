var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);

router.post('/add/:post_id', function(req, res, next){
  console.log(req.body);
  knex('comments')
  .insert({comment: req.body.comment,
           post_id: req.params.post_id})
  .return('post_id')
  .then(function(post_id){
    res.redirect('/posts/'+req.params.post_id)

  })
})

module.exports = router;
