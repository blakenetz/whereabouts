var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')[process.env.DB_ENV]);
const isAdmin = require("../users.js").isAdmin;
const authorizedUser = require("../users.js").authorizedUser;

/* GET users listing. */
// router.get('/', function(req, res, next) {
//     let user_id = req.session.id;
//     let admin = req.signedCookies.admin;
//     if (isAdmin === true) {
//         knex('users').then(function(users){
//             res.status(200).render('users', {
//               users: users
//             })
//         })
//     } else {
//         res.redirect('/');
//     }
// });

router.get('/:id', function(req, res, next){
  res.render('userDetails', {title: 'User Details!', id: req.params.id})
})

router.get('/:id/edit', function(req, res, next) {
  res.render('userEdit', {title: 'User Edit!', id: req.params.id})
})


module.exports = router;
