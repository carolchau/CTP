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
  var lng = req.body.longitude;
  var lat = req.body.latitude;
  var has_wifi = req.body.wifi ? true: false;
  var has_coffee = req.body.coffee ? true: false;
  var has_snacks = req.body.snacks ? true: false;
  var has_tables = req.body.tables ? true: false;
  var has_bathroom = req.body.bathroom ? true: false;
  var has_outlets = req.body.outlets ? true: false;
  var is_noisy = req.body.noisy ? true: false;

  req.checkBody('title', 'Title is required.').notEmpty();
  req.checkBody('longitude', 'Longitude is required.').notEmpty();
  req.checkBody('latitude', 'Latitude is required.').notEmpty();

  console.log('\n\n\n'+lng+' '+lat+'\n\n\n');

  var newReview = new Review({
    title: the_title,
    loc: [lng , lat],
    wifi: has_wifi,
    coffee: has_coffee,
    snacks: has_snacks,
    tables: has_tables,
    bathroom: has_bathroom,
    outlets: has_outlets,
    noisy: is_noisy
  });

  newReview.save(function(err, newReview){
    if (err) {
      //throw err;
      console.log(err);
      req.flash('error_msg', 'An error occurred posting the review' + lng + lat);
    } else {
      req.flash('success_msg', 'You have posted a new review!');
    }
    res.redirect('/');
  });
}); // End Post New

module.exports = router;
