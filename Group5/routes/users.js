var express = require('express');
var router = express.Router();

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
  res.render('users/register');
});

/* POST register. */
router.post('/register', function(req, res, next){

});

module.exports = router;
