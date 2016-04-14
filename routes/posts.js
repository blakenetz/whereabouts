var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')[process.env.DB_ENV]);
var errorArray = [];
var postAuthorAccess


/* GET home page. */
function isLoggedIn (req, res, next) {
  if (req.app.locals.session.user_id) {
    next();
  } else {
    res.redirect('/login')
  }
}

function isPostAuthor (currentUser, authorID) {
  if (currentUser === authorID) {
    postAuthorAccess = true;
  } else {
    postAuthorAccess = false;
  }
}

router.get('/add', isLoggedIn, function(req, res, next){
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
      rating: 500,
      user_fk: req.app.locals.session.user_id
    })
    .returning('post_id')
    .then(function(post_id){
      console.log(post_id);
      res.redirect('/posts/'+post_id)
    })
  }
})

router.get('/:id', function(req, res, next) {
  knex('posts')
  .where('posts.post_id', req.params.id).first()
  .innerJoin('users', 'posts.user_fk', 'users.user_id')

  .then(function(post){
    knex('comments')
    .where('comments.post_fk', req.params.id)
    .innerJoin('users', 'users.user_id', 'comments.user_fk')
    .then(function(comments){
      isPostAuthor(req.app.locals.session.user_id, post.user_fk);
      res.render('postDetails', {
        title: 'Post Details!',
        errors: errorArray,
        post_id: req.params.id,
        post: post,
        comments: comments,
        postAuthor: postAuthorAccess
      });
      errorArray = [];
    })
  })
});

router.delete('/:post_id', function(req, res, next) {
  console.log('got herez');
  console.log(req.params.post_id);
  knex('posts').where({'post_id': req.params.post_id}).del()
  .then(function() {
    console.log('here too');
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
      post_fk: req.params.post_id,
      user_fk: req.app.locals.session.user_id
    }).return('post_fk')
    .then(function(post_fk){
      res.redirect('/posts/'+req.params.post_id)
    })
  }
})

router.post('/:id/upvote', function(req, res, next){
  knex('posts').where({post_id: req.params.id})
  .increment('rating', 10)
  .returning('post_id')
  .then(function(post_id){
    res.redirect('/posts/'+post_id)
  })
})

router.post('/:id/downvote', function(req, res, next){

  knex('posts').where({post_id: req.params.id})
  .decrement('rating', 10)
  .returning('post_id')
  .then(function(post_id){
    res.redirect('/posts/'+post_id)
  })
})

module.exports = router;
