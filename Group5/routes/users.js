var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET login. */
router.get('/login', function(req, res, next){
  res.render('users/login');
});

/* POST login. */
router.post('/login', function(req, res, next){

});

/* GET register. */
router.get('/register', function(req, res, next){
  var notice = req.cookie.notice;

  res.render('users/register', { notice: notice });
});

/* POST register. */
router.post('/register', function(req, res, next){
  var firstname = req.param('firstname');
  var lastname = req.param('lastname');
  var email = req.param('email');
  var password = req.param('password');
  var passwordConfirm = req.param('passwordConfirm');

  // Handler: Password does not match
  if (password != passwordConfirm) {
    res.cookie('notice', 'Passwords does not match.');
    return res.redirect('/users/register');
  }

  // Handler: Email already exist
   

  res.status(200).json({email: email, password: password });
});

module.exports = router;
