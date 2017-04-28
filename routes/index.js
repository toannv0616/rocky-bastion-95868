var express = require('express');
var router = express.Router();

var facebook = require('../auth/facebook');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/auth/facebook', facebook.authFacebook);
router.get('/auth/facebook/callback', facebook.authFacebookCallback);

module.exports = router;
