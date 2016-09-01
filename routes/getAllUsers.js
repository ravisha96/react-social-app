var express = require('express'),
    router = express.Router(),
    User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    User.find({}).exec(function(error, result) {
        if (error) {
            throw error;
        }

        res.send({
            success: true,
            message: 'Successfully retrived ' + result.length + ' users.',
            data: result
        });
    });
});

module.exports = router;
