var express = require('express');
var assert = require('assert');
var router = express.Router();
var Location = require('../models/Location');


router.get('/api', function (req, res) {
  Location.find({}, {'_id':0}).exec(function (err, locations) {
    res.json(locations);
  });
});

/* temp path to store location data to the database */
router.get('/', function(req, res, next){

	var newLocation = new Location({
	  title : "out of reach",
    loc : {
      type: "Point",
      coordinates : [40.7111, -73.9974]
    }
	});

	newLocation.save(function(err, newLoc) {
    if (err) {
      console.log("couldn't save")
    } else {
      console.log("save");
    }
  });


});

module.exports = router;
