var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')[process.env.DB_ENV]);
var unirest = require('unirest');
var GoogleLocations = require('google-locations');
var locations = new GoogleLocations('AIzaSyCY6IF5KZuqMBt61jyVNQshduxTFUArNZY');

/* GET home page. */
router.get('/', function(req, res, next) {
  knex('posts')
  .then( function (posts) {
    res.render('index', { posts: posts, dis : 10});
  })
});
router.post('/', function(req, res, next) {
  console.log(req.body.dis);
  knex('posts').whereBetween('lat', [+req.body.nwr,+req.body.ser]).whereBetween('lng', [+req.body.sej,+req.body.nwj])
  .then( function (posts) {
    res.render('index', { posts: posts, dis: req.body.dis });
  })
});


module.exports = router;
