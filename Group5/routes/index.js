var express = require('express');
var router = express.Router();
var User = require('../models/User');

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 40.7541, lng: 73.9934}
  });
  var infoWindow = new google.maps.InfoWindow({map: map});
}

// Get Homepage
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Group5',
    partials: {
      layout: 'layout'
    }
  });
  initMap();
});

router.post('/register', function(req, res) {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var password = req.body.password;

  var newuser = new User();
  newuser.firstname = firstname;
  newuser.lastname = lastname;
  newuser.save(function(err, savedUser){
    if(err) {
      console.log(err);
      return res.status(500).send();
    }

    return res.status(200).send();
  })

})

module.exports = router;