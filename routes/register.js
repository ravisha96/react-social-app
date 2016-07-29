var express = require('express');
var router = express.Router();
var Register = require('../models/register');

/* GET users listing. */
router.post('register', function(req, res, next) {

  Register.save(res.body, function (error) {
    if(error) {
      throw error;
    }

    res.send({success: true, message: 'User registered successfully.'});

  });
});

module.exports = router;
