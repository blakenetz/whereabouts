var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')[process.env.DB_ENV]);
var unirest = require('unirest');
var GoogleLocations = require('google-locations');
var locations = new GoogleLocations('AIzaSyCY6IF5KZuqMBt61jyVNQshduxTFUArNZY');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { dis : 10});
});


module.exports = router;
