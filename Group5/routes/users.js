var express = require('express');
var router = express.Router();

var User = require('../models/User');

var mongoose = require('mongoose');

/* GET login. */
router.get('/login', function(req, res, next){
  res.render('login');
});

/* POST login. */
router.post('/login', function(req, res, next){

});

/* GET register. */
router.get('/register', function(req, res, next){
  //var notice = req.cookie.notice;

  //res.render('register', { notice: notice });

  res.render('register');
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

module.exports = router;
