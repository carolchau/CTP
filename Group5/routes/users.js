var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/User');


/* GET login. */
router.get('/login', function(req, res, next){
  res.render('login',  {
    title: 'Login to Group5',
    partials: {
      layout: 'layout'
    }
  });
});

/* GET register. */
router.get('/register', function(req, res, next){
  res.render('register',  {
    title: 'Register for Group5',
    partials: {
      layout: 'layout'
    }
  });
});

/* POST register. */
router.post('/register', function(req, res, next){
  var firstname = req.param('firstname');
  var lastname = req.param('lastname');
  var email = req.param('email');
  var password = req.param('password');
  var passwordConfirm = req.param('passwordConfirm');

  // Validation
  req.checkBody('firstname', 'First name is required.').notEmpty();
  req.checkBody('lastname', 'Last name is required.').notEmpty();
  req.checkBody('email', 'Email is invalid.').isEmail();
  req.checkBody('password', 'Password is required.').notEmpty();
  req.checkBody('passwordConfirm', 'Passwords do not match.').equals(req.body.password);

  var errors = req.validationErrors();

  // If there are no errors, create new User
  if (errors) {
    res.render('register', {
      errors:errors
    });
  } else {
    var newUser = new User({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password
    });

    User.createUser(newUser, function(err, User){
      if (err) throw err;
      console.log(err);
    });

    req.flash('success_msg', 'You are registered and can now login!');
    res.redirect('/users/login');
  }

  /*
  // Handler: Password does not match
  if (password != passwordConfirm) {
    res.cookie('notice', 'Passwords does not match.');
    return res.redirect('/users/register');
  }

  res.status(200).json({email: email, password: password });
  */
});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
    User.findOne({'email': email}, function(err, user){
      if (err) return done(err);
      if (!user) {
        return done(null, false, {message: "Unknown User."});
      }

      User.comparePassword(password, user.password, function(err, isMatch){
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {message: "Invalid password."});
        }
      });
    });
  }
));

/* POST login. */
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  }),
  function(req, res) {
    res.redirect('/');
    console.log('here');
  }
);



/* POST logout. */
router.get('/logout', function(req, res){
  req.logout();

  req.flash('success_msg', 'You are logged out.');

  res.redirect('/users/login');
});


/* GET profile */
router.get('/profile', ensureAuthenticated, function(req, res, next){
  res.render('profile',  {
    title: 'Your Profile',
    partials: {
      layout: 'layout'
    }
  });
});


function ensureAuthenticated(req, res, next) {
  if (res.isAuthenticated() ){
    return next();
  } else {
    req.flash('error_msg', "You are not logged in. ");
    res.redirect('/');
  }
}

module.exports = router;
