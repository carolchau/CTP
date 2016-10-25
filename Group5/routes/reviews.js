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
  var title = req.params.title;
  var lng = parseInt(req.params.longitude);
  var lat = parseInt(req.params.latitude);
  var coffee = req.params.coffee;
  var wifi = req.params.wifi;
  var snacks = req.params.snacks;
  var tables = req.params.tables;
  var bathroom = req.params.bathroom;
  var outlets = req.params.outlets;
  var noisy = req.params.noisy;

  req.checkBody('title', 'Title is required.').notEmpty();
  req.checkBody('longitude', 'Longitude is required.').notEmpty();
  req.checkBody('latitude', 'Latitude is required.').notEmpty();
  
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

  console.log(newReview);

  req.flash('success_msg', 'You have posted a new review!');
  // res.redirect('/');
});

module.exports = router;