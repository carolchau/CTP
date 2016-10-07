var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET login. */
router.get('/users/login', function(req, res, next){
  res.render('users/login');
});

/* POST login. */
router.post('/users/login', function(req, res, next){

});

/* GET register. */
router.get('/users/signup', function(req, res, next){

});

/* POST register. */
router.post('/users/signup', function(req, res, next){

});

module.exports = router;
