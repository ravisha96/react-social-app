var express = require('express');
var router = express.Router();
var User = require('../models/register');

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  var nick = new User({
      username: 'ravi_sha96',
      password: 'India',
      admin: true
  });
  
  
  nick.save(function (err) {
    if(err) {
      throw err;
    }
    
    console.log('User saved successfully');
    res.json({ success: true });
  });

});

module.exports = router;
