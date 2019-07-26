var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {loginTitle: 'Login'});
});


router.get('/register', function(req, res, next) {
  res.render('register', {registerTitle: 'Register'});
});


module.exports = router;
