var express = require('express'),
    router = express.Router(),
    Register = require('../models/register');

/* GET users listing. */
router.post('/', function(req, res, next) {
    var user = new Register(req.body);
    user.save(function(error) {
        if (error) {
            throw error;
        }

        res.send({
            success: true,
            message: 'User registered successfully.'
        });
    });
});

module.exports = router;
