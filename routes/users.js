'use strict';

var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')[process.env.DB_ENV]);
const isAdmin = require("../userAuth.js").isAdmin;
const authorizedUser = require("../userAuth.js").authorizedUser;


router.get('/:id', function(req, res, next){
  knex('users').where({user_id: req.params.id})
  .then( function (user) {
    res.render('userDetails', {user: user})
  })
})



module.exports = router;
