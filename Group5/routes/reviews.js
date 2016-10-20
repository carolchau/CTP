var express = require('express');
var router = express.Router();

var User = require('../models/Review');

/* GET review */
router.get('/', function(req, res, next){
  console.log("hello");
});

/* POST new. */
router.post('/new', function(req, res, next){
  var title = req.param('title');
  var lng = parseInt(req.param('longitude'));
  var lat = parseInt(req.param('latitude'));
  var coffee = req.param('coffee');
  var wifi = req.param('wifi');
  var snacks = req.param('snacks');
  var tables = req.param('tables');
  var bathroom = req.param('bathroom');
  var outlets = req.param('outlets');
  var noisy = req.param('noisy');

  // var errors = req.validationErrors();

  var newReview = new Review({
  'title': title,
  'loc': {
    type: [lng, lat],  // [<longitude>, <latitude>]
    index: '2d'        // create the geospatial index
  },
  'wifi': wifi,
  'coffee': coffee,
  'snacks': snacks,
  'tables': tables,
  'bathroom': bathroom,
  'outlets': outlets,
  'noisy': noisy
});

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

});
