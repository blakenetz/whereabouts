var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')[process.env.DB_ENV]);
var unirest = require('unirest');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("this is the user", req.session);
    res.render('index', { dis : 10});
});


module.exports = router;
