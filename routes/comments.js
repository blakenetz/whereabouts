var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')[process.env.DB_ENV]);

router.delete('/:id', function(req, res, next) {
  knex('comments').where({'comment_id': req.params.id}).del()
  .then(function() {
    res.status(200).json({comment: 'deleted'});
  })
});

module.exports = router;
