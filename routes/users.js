var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Users!' });
});

router.get('/:id', function(req, res, next){
  res.render('userDetails', {title: 'User Details!', id: req.params.id})
})

router.get('/:id/edit', function(req, res, next) {
  res.render('userEdit', {title: 'User Edit!', id: req.params.id})
})


module.exports = router;
