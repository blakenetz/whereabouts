var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')['development']);

/* GET home page. */
router.get('/add', function(req, res, next){
  res.render('postCreate.hbs', {title: 'Post Create!'})
})

router.post('/add', function(req, res, next){
  console.log(req.body);
  knex('posts').insert({title: req.body.title,
                        lat: req.body.lat,
                        lng: req.body.lng,
                        imgLink: req.body.img_link,
                        description: req.body.description
                        })
.then(function(){
  res.redirect('/')
  })
})

router.get('/:id', function(req, res, next) {
  knex('posts').where({id: req.params.id}).first()
  .then(function(post){
    console.log(post);
    res.render('postDetails', { title: 'Post Details!',
                                id: req.params.id,
                                post: post});
    })
});

router.get('/:id/edit', function(req, res, next){
  knex('posts').where({id: req.params.id}).first()
  .then(function(post){
    console.log(post);
    res.render('postEdit', {title: 'Post Edit!',
                            id: req.params.id,
                            post: post});
  })
})

router.post('/:id/edit', function(req, res, next){
  knex('posts').where({id: req.params.id})
  .update({title: req.body.title,
          lat: req.body.lat,
          lng: req.body.lng,
          imgLink: req.body.img_link,
          description: req.body.description
          })
          .returning('id')
          .then(function(id){
            res.redirect('/posts/'+id)
          })
})



module.exports = router;
