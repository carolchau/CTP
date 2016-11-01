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
  console.log(errors);
  // If there are no errors, create new User
  if (errors) {
    res.render('register', {
      errors:errors
    });
  } else {
    var newUser = new User({
      first_name: firstname,
      last_name: lastname,
      email: email,
      password: password
    });

    User.createUser(newUser, function(err, User){
      if (err) {
        //throw err;
        console.log(err);
        req.flash('error_msg', 'A user with that email already exists!');
      } else {
        req.flash('success_msg', 'You are registered and can now login!');
      }
      res.redirect('/users/login');
    });

    
  }

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

passport.redirectIfNotLoggedIn = (route) =>
  (req, res, next) => (req.user ? next() : res.redirect(route));

/* GET profile */
router.get('/profile', passport.redirectIfNotLoggedIn('/'), function(req, res, next) {
  res.render('profile',  {
    title: 'Your Profile',
    user: req.user,
    partials: {
      layout: 'layout'
    }
  });
});

passport.redirectIfLoggedIn = (route) =>
  (req, res, next) => (req.user ? res.redirect(route) : next());

module.exports = router;
