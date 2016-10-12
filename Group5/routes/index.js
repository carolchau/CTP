var express = require('express');
var router = express.Router();
var User = require('../models/User');

// Get Homepage
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
