require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var knex = require('knex')(require('./knexfile')[process.env.DB_ENV]);
var bcrypt = require('bcrypt');

var GitHubStrategy = require('passport-github2').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');

var admin = require('./routes/admin');
var auth = require('./routes/auth');
var routes = require('./routes/index');
var users = require('./routes/users');
var posts = require('./routes/posts');
// var comments = require('./routes/comments');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieSession({
  name: 'user',
  secret: process.env.GITHUB_CLIENT_SECRET
}));

app.get('/auth/github', passport.authenticate('github'), function(req, res){
  // The request will be redirected to LinkedIn for authentication, so this
  // function will not be called.
});

app.get('/auth/local', passport.authenticate('local'), function(req, res){
  // The request will be redirected to LinkedIn for authentication, so this
  // function will not be called.
});

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.post('/auth/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
      // Successful authentication, redirect home.
    res.redirect('/');
  });

passport.use(new LocalStrategy(
  function(username, password, cb) {
  knex('users').where({ username: username }).first()
  .then(function (user) {
    console.log(user);
    if (!user) { return cb(null, false); }
    else if ( user && bcrypt.compareSync(password + user.salt, user.password) ) {
      return cb(null, {user_id: user.id, admin: user.admin});
    } else {
      return cb(null, false);
    }
  });
}))

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.HOST + '/auth/github/callback',
    // state: true
  },

    function(accessToken, refreshToken, profile, cb) {
    knex('users').where({auth_strategy: "github", auth_id: profile.id}).first()
    .then(function(user){
      if (user) {
        return cb(null, {user_id: user.id, admin: user.admin});
      }
      if (!user) {
        knex('users').insert({
          auth_id: profile.id,
          auth_strategy: 'github',
          username: profile.username,
          email: profile._json.email,
          avatar: profile._json.avatar_url
        }).returning('*')
          .then(function(user){
            return cb(null, {user_id: user.id, admin: user.admin});
          })
        }
      })
}));



passport.serializeUser(function(user, done) {

  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user)
});



function isAdmin (req, res, next) {
  console.log(req.session.length);
    if (req.session.passport.user.admin) {
      next()
    } else {
    res.redirect('/')
  }
}

// app.use(function (req, res, next) {
//   console.log('got here');
//   req.user = req.session.passport.user;
//   console.log('got here2');
//   res.locals.user = req.session.passport.user;
//   console.log('got here3');
//   next();
// })

app.use('/admin', isAdmin, admin);
app.use('/auth', auth);
app.use('/', routes);
app.use('/users', users);
app.use('/posts', posts);
// app.use('/comments', comments);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
