var express = require('express');
var router = express.Router();

var Review = require('../models/Review');

/* GET review */
router.get('/', function(req, res, next){
  res.render('review', {
    title: 'Post a new Review to Group5',
    partials: {
      layout: 'layout'
    }
  });
  console.log("reviews home page");
});

/* POST new. */
router.post('/new', function(req, res, next){
  var the_title = req.param('title');
  var lng = parseFloat(req.param('longitude'));
  var lat = parseFloat(req.param('latitude'));
  var has_coffee = req.param('coffee');
  var has_wifi = req.param('wifi');
  var has_snacks = req.param('snacks');
  var has_tables = req.param('tables');
  var has_bathroom = req.param('bathroom');
  var has_outlets = req.param('outlets');
  var is_noisy = req.param('noisy');

  req.checkBody('title', 'Title is required.').notEmpty();
  req.checkBody('longitude', 'Longitude is required.').notEmpty();
  req.checkBody('latitude', 'Latitude is required.').notEmpty();
  
  console.log('\n\n\n'+lng+' '+lat+'\n\n\n');

  var newReview = new Review({
    title: the_title,
    loc: [lng, lat],
    wifi: has_wifi,
    coffee: has_coffee,
    snacks: has_snacks,
    tables: has_tables,
    bathroom: has_bathroom,
    outlets: has_outlets,
    noisy: is_noisy
  });

  newReview.save(function(err, newReview) {
    if (err) {
        //throw err;
        console.log(err);
        req.flash('error_msg', 'An error occurred posting the review');
      } else {
        req.flash('success_msg', 'You are have posted a new review!');
      }
  })
  res.redirect('/');
});

module.exports = router;