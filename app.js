require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');

var GitHubStrategy = require('passport-github2').Strategy;
var passport = require('passport');

var auth = require('./routes/auth');
var routes = require('./routes/index');
var users = require('./routes/users');
var posts = require('./routes/posts');

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

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.HOST + '/auth/github/callback',
    // scope: ['r_emailaddress', 'r_basicprofile'],
    // state: true
  },
  function(accessToken, refreshToken, profile, done) {

    process.nextTick(function () {
      console.log('~~~~~~~~~~~~~~~~~~~~~');
      console.log(profile);
      console.log('~~~~~~~~~~~~~~~~~~~~~');

          // To keep the example simple, the user's Tumblr profile is returned to
          // represent the logged-in user.  In a typical application, you would want
          // to associate the Tumblr account with a user record in your database,
          // and return that user instead.
          return done(null, profile.username);
        });
      }
    ));


passport.serializeUser(function(user, done) {
  console.log('sU~~~~~~~~~~~');
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  console.log('dU~~~~~~~~~~~');
  done(null, user)
});

// app.use(function (req, res, next) {
//   console.log('got here');
//   console.log(req.user, "~~~~~~~~~~");
//   res.locals.user = req.user
//   next()
//   next()
// })

app.use('/', routes);
app.use('/users', users);
app.use('/posts', posts);
app.use('/auth', auth);

// app.get('/logout', function(req, res){
//   req.session.passport.user = null;
//   req.logout();
//   res.redirect('/');
// });

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
