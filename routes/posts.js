var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')[process.env.DB_ENV]);

var errorArray = [];
/* GET home page. */
router.get('/add', function(req, res, next){
  res.render('postCreate.hbs')
})

router.post('/add', function(req, res, next){
  if ( req.body.title.length < 1 ){
    res.render('postCreate', {
      erra : "Title can't be blank",
      body: req.body
    })
  } if ( req.body.img_link.length < 1 ){
    res.render('postCreate', {
      errb : "Please insert an image link",
      body: req.body
    })
  } if ( req.body.description.length < 1 ){
    res.render('postCreate', {
      errc : "Description can't be blank",
      body: req.body
    })
  } else {
    knex('posts').insert({
      title: req.body.title,
      lat: req.body.lat,
      lng: req.body.lng,
      img_link: req.body.img_link,
      description: req.body.description,
    })
    .then(function(){
      res.redirect('/')
    })
  }
})

router.get('/:id', function(req, res, next) {
  knex('posts')
  .where('posts.id', req.params.id).first()
  .innerJoin('users', 'posts.user_id', 'users.id')

  .then(function(post){
    knex('comments')
    .where('comments.post_id', req.params.id)
    .innerJoin('users', 'users.id', 'comments.user_id')
    .then(function(comments){
      res.render('postDetails', {
        title: 'Post Details!',
        errors: errorArray,
        post_id: req.params.id,
        post: post,
        comments: comments,
      });
      errorArray = [];
    })
  })
});

router.delete('/:post_id', function(req, res, next) {
  console.log('got herez');
  console.log(req.params.post_id);
  knex('posts').where({'id': req.params.post_id}).del()
  .then(function() {
    console.log('here too');
    // res.redirect('/');
    res.status(200).json('success');
  })
});

router.post('/comments/add/:post_id', function(req, res, next){

  if(!req.session.passport) {
    errorArray.push('You Must Be Logged In To Leave a Comment!');
    res.redirect('/posts/'+req.params.post_id)
  } else {
    knex('comments')
    .insert({
      comment: req.body.comment,
      post_id: req.params.post_id,
      user_id: req.session.passport.user.user_id
    }).return('post_id')
    .then(function(post_id){
      res.redirect('/posts/'+req.params.post_id)
    })
  }
})


router.get('/:id/edit', function(req, res, next){
  knex('posts').where({id: req.params.id}).first()
  .then(function(post){
    res.render('postEdit', {title: 'Post Edit!',
    id: req.params.id,
    post: post});
  })
})

router.post('/:id/edit', function(req, res, next){
  if ( req.body.title.length < 1 ){
    res.render('postEdit', {
      erra : "Title can't be blank",
      post: req.body
    })
  } if ( req.body.img_link.length < 1 ){
    res.render('postEdit', {
      errb : "Please insert an image link",
      post: req.body
    })
  } if ( req.body.description.length < 1 ){
    res.render('postEdit', {
      errc : "Description can't be blank",
      post: req.body
    })
  } else {
    knex('posts').where({id: req.params.id})
    .update({
      title: req.body.title,
      lat: req.body.lat,
      lng: req.body.lng,
      img_link: req.body.img_link,
      description: req.body.description
    })
    .returning('id')
    .then(function(id){
      res.redirect('/posts/'+id)
    })
  }
})

router.post('/:id/upvote', function(req, res, next){
  knex('posts').where({id: req.params.id})
  .increment('rating', 10)
  .returning('id')
  .then(function(id){
    res.redirect('/posts/'+id)
  })
})

router.post('/:id/downvote', function(req, res, next){

  knex('posts').where({id: req.params.id})
  .decrement('rating', 10)
  .returning('id')
  .then(function(id){
    res.redirect('/posts/'+id)
  })
})

module.exports = router;
