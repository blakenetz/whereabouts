var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/add', function(req, res, next){
  res.render('postCreate.hbs', {title: 'Post Create!'})
})

router.get('/:id', function(req, res, next) {
  res.render('postDetails.hbs', { title: 'Post Details!', id: req.params.id });
});

router.get('/:id/edit', function(req, res, next){
  res.render('postEdit.hbs', {title: 'Post Edit!', id: req.params.id});
})

module.exports = router;
